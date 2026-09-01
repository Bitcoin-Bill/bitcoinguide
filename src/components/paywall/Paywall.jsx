import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import UnlockPrompt from "./UnlockPrompt";
import PaymentScreen from "./PaymentScreen";
import ReceiptView from "./ReceiptView";

export default function Paywall({ productSlug, children }) {
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState("locked"); // locked | creating | paying | paid
  const [invoice, setInvoice] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const products = await base44.entities.Product.filter({ slug: productSlug });
        const p = products && products[0];
        setProduct(p);
        try {
          const me = await base44.auth.me();
          setUser(me);
          if (p && me) {
            const acc = await base44.entities.Access.filter({
              user_id: me.id,
              product_id: p.id,
            });
            if (acc && acc.length > 0) setHasAccess(true);
          }
        } catch (e) {
          // not logged in — stays locked
        }
      } catch (e) {
        // product lookup failure
      } finally {
        setLoading(false);
      }
    })();
  }, [productSlug]);

  const unlock = async () => {
    setError(null);
    if (!user) {
      base44.auth.redirectToLogin(window.location.pathname);
      return;
    }
    if (!product) return;
    setStage("creating");
    try {
      const res = await base44.functions.invoke("createBtcpayInvoice", {
        productId: product.id,
        redirectUrl: window.location.href,
      });
      setInvoice(res.data);
      setStage("paying");
    } catch (e) {
      setError(e?.response?.data?.error || e?.message || "Failed to create invoice");
      setStage("locked");
    }
  };

  const onSettled = async () => {
    setHasAccess(true);
    try {
      const recs = await base44.entities.Receipt.filter({
        invoice_id: invoice.invoiceRecordId,
      });
      setReceipt(recs && recs[0]);
    } catch (e) {
      // receipt may take a moment; non-fatal
    }
    setStage("paid");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-border border-t-verdigris rounded-full animate-spin" />
      </div>
    );
  }

  if (hasAccess && stage !== "paid") return <>{children}</>;

  if (stage === "paid") {
    return (
      <div className="space-y-6">
        {receipt && <ReceiptView receipt={receipt} />}
        {children}
      </div>
    );
  }

  if (stage === "paying" && invoice) {
    return <PaymentScreen invoice={invoice} onSettled={onSettled} />;
  }

  return (
    <div>
      {error && (
        <p className="font-mono text-[10px] tracking-wide text-destructive text-center mb-4">
          {error}
        </p>
      )}
      <UnlockPrompt product={product} busy={stage === "creating"} onUnlock={unlock} />
    </div>
  );
}