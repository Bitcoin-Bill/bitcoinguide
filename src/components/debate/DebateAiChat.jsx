import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Copy, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";

const SYSTEM_PROMPT =
  "You are a concise, sharp Bitcoin and economics debate assistant embedded on a forum. " +
  "Help users test claims, spot logical fallacies, find relevant arguments, and clarify economic concepts. " +
  "Be direct, fair, and pro-Bitcoin where grounded by facts. Keep answers tight — 1-4 short paragraphs.";

export default function DebateAiChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Ask me anything about Bitcoin, economics, or a debate you're drafting. I can stress-test claims and spot fallacies.",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    const next = [...messages, { role: "user", text: q }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const convo = next
        .map((m) => (m.role === "user" ? `User: ${m.text}` : `Assistant: ${m.text}`))
        .join("\n\n");
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `${SYSTEM_PROMPT}\n\nConversation so far:\n${convo}`,
        add_context_from_internet: true,
        model: "gemini_3_flash",
      });
      const answer =
        typeof res === "string" ? res : res?.answer || res?.text || res?.response || JSON.stringify(res);
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "Sorry — I hit a snag. Try rephrasing your question." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-verdigris/40 bg-parchment rounded-sm">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 group"
        >
          <span className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-verdigris" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-ink">
              Ask the Bitcoin debate assistant
            </span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead group-hover:text-verdigris transition-colors duration-300">
            Open
          </span>
        </button>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border">
            <span className="flex items-center gap-2.5">
              <Sparkles size={16} className="text-verdigris" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-ink">
                Bitcoin debate assistant
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="flex items-center justify-center h-6 w-6 rounded text-lead hover:text-ink transition-colors duration-300"
            >
              <X size={14} />
            </button>
          </div>

          <div ref={scrollRef} className="max-h-72 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`group max-w-[85%] rounded-sm px-3 py-2 font-body text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-verdigris text-parchment"
                      : "bg-muted text-ink border border-border"
                  }`}
                >
                  {m.text}
                  {m.role === "assistant" && (
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(m.text);
                        setCopied(i);
                        setTimeout(() => setCopied(null), 1500);
                      }}
                      aria-label="Copy response"
                      className="mt-1.5 inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.15em] uppercase text-lead/70 hover:text-verdigris transition-colors duration-300"
                    >
                      {copied === i ? <Check size={11} /> : <Copy size={11} />}
                      {copied === i ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
                <span className="inline-block w-3 h-3 border border-lead/40 border-t-lead rounded-full animate-spin" />
                Thinking…
              </div>
            )}
          </div>

          <div className="border-t border-border px-3 py-3 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder="Ask about a claim, fallacy, or Bitcoin economics…"
              className="flex-1 resize-none bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris max-h-24"
            />
            <button
              onClick={send}
              disabled={!input.trim() || busy}
              aria-label="Send"
              className="flex items-center justify-center h-9 w-9 rounded-sm border border-verdigris text-verdigris hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}