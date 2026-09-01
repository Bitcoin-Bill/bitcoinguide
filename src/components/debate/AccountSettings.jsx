import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";
import {
  X,
  Loader2,
  Upload,
  User,
  Bell,
  Mail,
  LogOut,
  Trash2,
  Save,
  Camera,
} from "lucide-react";

const ORIGIN = typeof window !== "undefined" ? window.location.origin : "https://bitcoinguide.app";

export default function AccountSettings({ onClose, onSaved }) {
  const { user, logout, checkUserAuth } = useAuth();
  const [name, setName] = useState(user?.debate_name || user?.full_name || "");
  const [avatar, setAvatar] = useState(user?.debate_avatar || "");
  const [hideEmail, setHideEmail] = useState(!!user?.debate_hide_email);
  const [notify, setNotify] = useState(user?.debate_notify !== false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const fileRef = useRef(null);

  const onPickFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setErr("Image must be under 4MB.");
      return;
    }
    setErr(null);
    setUploading(true);
    try {
      const res = await base44.integrations.Core.UploadFile({ file });
      setAvatar(res.file_url);
    } catch (e) {
      setErr(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    setErr(null);
    setBusy(true);
    try {
      await base44.auth.updateMe({
        debate_name: name.trim() || undefined,
        debate_avatar: avatar || undefined,
        debate_hide_email: hideEmail,
        debate_notify: notify,
      });
      await checkUserAuth();
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
      onSaved?.();
    } catch (e) {
      setErr(e?.message || "Failed to save settings");
    } finally {
      setBusy(false);
    }
  };

  const removeAvatar = () => setAvatar("");

  const Row = ({ icon: Icon, title, desc, children }) => (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-start gap-3 min-w-0">
        <Icon size={16} className="text-lead shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="font-body text-sm text-ink">{title}</p>
          {desc && <p className="font-body text-[11px] text-lead/70">{desc}</p>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );

  const Toggle = ({ on, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
        on ? "bg-verdigris" : "bg-border"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-parchment transition-transform duration-300 ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-parchment border border-border rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead flex items-center gap-1.5">
            <User size={12} /> Account settings
          </p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-lead hover:text-ink transition-colors duration-300"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative shrink-0">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover border border-border"
                />
              ) : (
                <div className="w-16 h-16 rounded-full border border-border bg-secondary flex items-center justify-center">
                  <User size={22} className="text-lead/60" />
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 rounded-full bg-parchment/70 flex items-center justify-center">
                  <Loader2 size={16} className="animate-spin text-lead" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPickFile}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:text-ink hover:border-ink transition-colors duration-300 disabled:opacity-50"
              >
                <Camera size={12} /> {avatar ? "Change" : "Upload"}
              </button>
              {avatar && (
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-destructive hover:opacity-70 transition-opacity duration-300"
                >
                  <Trash2 size={11} /> Remove
                </button>
              )}
            </div>
          </div>
          <p className="font-body text-[11px] text-lead/70 mb-4 -mt-1">
            Shown next to your name on debates you post.
          </p>

          {/* Display name */}
          <div className="mb-4">
            <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-1.5 block">
              Display name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris"
            />
          </div>

          <div className="border-t border-border">
            <Row
              icon={Bell}
              title="Response notifications"
              desc="Email me when someone responds to my prompts"
            >
              <Toggle on={notify} onClick={() => setNotify((v) => !v)} />
            </Row>
            <Row
              icon={Mail}
              title="Hide my email"
              desc="Don't show my email on the forum"
            >
              <Toggle on={hideEmail} onClick={() => setHideEmail((v) => !v)} />
            </Row>
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-border">
          {err && (
            <p className="font-mono text-[10px] text-destructive mb-2">{err}</p>
          )}
          <button
            onClick={save}
            disabled={busy}
            className="inline-flex items-center justify-center gap-1.5 w-full font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-2.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50"
          >
            {busy ? (
              <>
                <Loader2 size={12} className="animate-spin" /> Saving…
              </>
            ) : savedFlash ? (
              "Saved"
            ) : (
              <>
                <Save size={12} /> Save settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}