import React, { useState } from "react";
import { Printer, Download, Mail, Check } from "lucide-react";
import { jsPDF } from "jspdf";
import { base44 } from "@/api/base44Client";

export default function ReceiptView({ receipt, onClose }) {
  const [emailing, setEmailing] = useState(false);
  const [emailed, setEmailed] = useState(false);

  const fmtDate = (d) => (d ? new Date(d).toLocaleString() : "—");

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 48;
    let y = 64;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Payment Receipt", left, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 28;
    const rows = [
      ["Receipt Number", receipt.receipt_number],
      ["Invoice ID", receipt.btcpay_invoice_id || receipt.invoice_id],
      ["Product", receipt.product_name],
      ["Store", receipt.store_name || "—"],
      ["BTC Amount", `${receipt.btc_amount ?? 0} sats`],
      ["Fiat Amount", `${receipt.fiat_amount ?? 0} ${receipt.currency || "USD"}`],
      ["Payment Method", receipt.payment_method],
      ["Transaction ID / Hash", receipt.transaction_id || "—"],
      ["Date", fmtDate(receipt.created_date)],
    ];
    rows.forEach(([k, v]) => {
      doc.setFont("helvetica", "bold");
      doc.text(k, left, y);
      doc.setFont("helvetica", "normal");
      doc.text(String(v ?? "—"), left + 150, y);
      y += 20;
    });
    doc.save(`receipt-${receipt.receipt_number}.pdf`);
  };

  const emailReceipt = async () => {
    if (!receipt.user_email) return;
    setEmailing(true);
    try {
      const body = [
        `Receipt ${receipt.receipt_number}`,
        `Product: ${receipt.product_name}`,
        `Amount: ${receipt.fiat_amount} ${receipt.currency} (${receipt.btc_amount} sats)`,
        `Method: ${receipt.payment_method}`,
        `Transaction: ${receipt.transaction_id || "—"}`,
        `Date: ${fmtDate(receipt.created_date)}`,
        `Invoice: ${receipt.btcpay_invoice_id || receipt.invoice_id}`,
      ].join("\n");
      await base44.integrations.Core.SendEmail({
        to: receipt.user_email,
        subject: `Receipt ${receipt.receipt_number} — ${receipt.product_name}`,
        body,
      });
      setEmailed(true);
    } catch (e) {
      // email may fail if recipient is not a registered app user
    } finally {
      setEmailing(false);
    }
  };

  return (
    <div className="border border-verdigris bg-parchment rounded-sm p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Check size={16} className="text-verdigris" />
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-verdigris">
          Payment confirmed — content unlocked
        </p>
      </div>
      <div className="space-y-1.5 mb-5 font-body text-sm">
        <Row k="Receipt Number" v={receipt.receipt_number} />
        <Row k="Invoice ID" v={receipt.btcpay_invoice_id || receipt.invoice_id} />
        <Row k="Product" v={receipt.product_name} />
        <Row k="BTC Amount" v={`${receipt.btc_amount ?? 0} sats`} />
        <Row k="Fiat Amount" v={`${receipt.fiat_amount ?? 0} ${receipt.currency || "USD"}`} />
        <Row k="Payment Method" v={receipt.payment_method} />
        <Row k="Transaction ID" v={receipt.transaction_id || "—"} mono />
        <Row k="Date" v={fmtDate(receipt.created_date)} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300">
          <Printer size={12} /> Print
        </button>
        <button onClick={downloadPdf} className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300">
          <Download size={12} /> PDF
        </button>
        {receipt.user_email && (
          <button onClick={emailReceipt} disabled={emailing || emailed} className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300 disabled:opacity-50">
            {emailed ? <Check size={12} /> : <Mail size={12} />} {emailed ? "Sent" : emailing ? "Sending…" : "Email"}
          </button>
        )}
      </div>
    </div>
  );
}

function Row({ k, v, mono }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-mono text-[10px] tracking-wide uppercase text-lead/60 shrink-0">{k}</span>
      <span className={`text-ink text-right break-all ${mono ? "font-mono text-xs" : ""}`}>{v ?? "—"}</span>
    </div>
  );
}