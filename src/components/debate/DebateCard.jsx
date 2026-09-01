import React, { useState } from "react";
import { Gavel, GitFork, ChevronRight, Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ArgumentCard from "./ArgumentCard";
import ArgumentForm from "./ArgumentForm";
import DebateAvatar from "./DebateAvatar";
// The signed-in member is passed in as a prop from the Debate page.

export default function DebateCard({ debate, member, onPaid, debateMap }) {
  const [respondText, setRespondText] = useState("");
  const [forkArg, setForkArg] = useState("");
  const [forkSide, setForkSide] = useState("pro");
  const [showFork, setShowFork] = useState(false);
  const [posting, setPosting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showMediation, setShowMediation] = useState(false);
  const [mediation, setMediation] = useState({});
  const [mediating, setMediating] = useState(false);
  const [engageSlot, setEngageSlot] = useState(null);
  const [engageText, setEngageText] = useState("");

  const proposerFilled = !!debate.proposer_id;
  const challengerFilled = !!debate.challenger_id;
  const proposerOpen = !proposerFilled;
  const challengerOpen = !challengerFilled;
  const engaged = proposerFilled && challengerFilled;
  const bothOpen = proposerOpen && challengerOpen;
  const seats = `${proposerFilled ? 1 : 0}/${challengerFilled ? 1 : 0}`;
  const argCount = (debate.arguments || []).length;

  const isMember = !!member;
  const isProposer = isMember && debate.proposer_id === member.id;
  const isChallenger = isMember && debate.challenger_id === member.id;

  // The creator posted the opening argument; only they can delete the debate,
  // and only within 24 hours of posting.
  const isCreator =
    isMember &&
    (debate.proposer_id === member.id ||
      (debate.arguments || [])[0]?.author_id === member.id);
  const createdMs = new Date(debate.created_date).getTime();
  const canDelete =
    isCreator && Number.isFinite(createdMs) && Date.now() - createdMs < 24 * 60 * 60 * 1000;

  // The opening argument sets the proposer's stance; the challenger takes the
  // opposite. This lets a fork start "against" the original prompt.
  const openerSide = (debate.arguments || [])[0]?.side || "pro";
  const challengerSide = openerSide === "pro" ? "con" : "pro";
  const parentTopic = debateMap?.[debate.parent_debate_id]?.topic || "";

  // Pull each participant's profile pic from their posted arguments — the
  // opener is the proposer; the challenger's avatar comes from any argument
  // they authored.
  const proposerAvatar = (debate.arguments || [])[0]?.author_avatar || "";
  const challengerAvatar = debate.challenger_id
    ? (debate.arguments || []).find((a) => a.author_id === debate.challenger_id)?.author_avatar || ""
    : "";

  const votes = debate.votes || [];
  const upvotes = votes.filter((v) => v.value === 1).length;
  const downvotes = votes.filter((v) => v.value === -1).length;
  const myVote = isMember ? votes.find((v) => v.user_id === member.id)?.value : undefined;

  const now = () => new Date().toISOString();

  const reload = () => {
    setRespondText("");
    setEngageSlot(null);
    setEngageText("");
    setForkArg("");
    setForkSide("pro");
    setShowFork(false);
    onPaid?.();
  };

  const deleteDebate = async () => {
    if (posting) return;
    if (!window.confirm("Delete this debate and all its arguments? This can't be undone.")) return;
    setPosting(true);
    try {
      await base44.entities.Debate.delete(debate.id);
      onPaid?.();
    } catch (e) {
      console.error("delete failed", e);
    } finally {
      setPosting(false);
    }
  };

  const castVote = async (value) => {
    if (!isMember || posting) return;
    setPosting(true);
    try {
      const fresh = await base44.entities.Debate.get(debate.id);
      let nextVotes = [...(fresh.votes || [])];
      const idx = nextVotes.findIndex((v) => v.user_id === member.id);
      if (idx >= 0) {
        if (nextVotes[idx].value === value) {
          nextVotes.splice(idx, 1);
        } else {
          nextVotes[idx] = { ...nextVotes[idx], value };
        }
      } else {
        nextVotes.push({ user_id: member.id, value, created_date: now() });
      }
      await base44.entities.Debate.update(debate.id, { votes: nextVotes });
      onPaid?.();
    } catch (e) {
      console.error("vote failed", e);
    } finally {
      setPosting(false);
    }
  };

  const deleteArgument = async (argId) => {
    if (posting) return;
    if (!window.confirm("Delete this comment? This can't be undone.")) return;
    setPosting(true);
    try {
      const fresh = await base44.entities.Debate.get(debate.id);
      const next = (fresh.arguments || []).filter((a) => a.id !== argId);
      await base44.entities.Debate.update(debate.id, { arguments: next });
      onPaid?.();
    } catch (e) {
      console.error("delete argument failed", e);
    } finally {
      setPosting(false);
    }
  };

  const analyzeOne = async (arg) => {
    const prompt = `You are a strict, objective logic mediator. Analyze the following argument using the formal and informal rules of logic. Identify any specific logical fallacies present (e.g. ad hominem, strawman, false dichotomy, equivocation, hasty generalization, non sequitur, appeal to authority, circular reasoning, begging the question). List any unsupported premises. Rate the logical validity from 0 to 100. Provide one concise, neutral suggestion for strengthening the argument. Be strict and impartial — do not agree or disagree with the argument's conclusion, only assess its logical structure.

Debate topic: "${debate.topic}"

Argument (${arg.side === "pro" ? "Proposer" : arg.side === "comment" ? "Comment" : "Challenger"}): "${arg.text}"

Return only the JSON.`;
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            fallacies: { type: "array", items: { type: "string" } },
            unsupported_premises: { type: "array", items: { type: "string" } },
            validity_score: { type: "number" },
            suggestion: { type: "string" },
          },
        },
      });
      return typeof res === "string" ? JSON.parse(res) : res;
    } catch (e) {
      return {
        fallacies: [],
        unsupported_premises: ["Mediator could not analyze this argument."],
        validity_score: 0,
        suggestion: "Analysis failed — try again.",
      };
    }
  };

  // Mediation is per-viewer: notes are computed on demand and kept in local
  // state only — never persisted to the debate, so they don't clutter the
  // page for everyone else.
  const runMediation = async () => {
    const args = debate.arguments || [];
    const needed = args.filter((a) => !mediation[a.id]);
    if (needed.length === 0) return;
    setMediating(true);
    for (const arg of needed) {
      const note = await analyzeOne(arg);
      setMediation((prev) => ({ ...prev, [arg.id]: note }));
    }
    setMediating(false);
  };

  const toggleMediation = () => {
    if (showMediation) {
      setShowMediation(false);
      return;
    }
    setShowMediation(true);
    runMediation();
  };

  const addArgument = async (side, text, extra = {}) => {
    const fresh = await base44.entities.Debate.get(debate.id);
    const newArg = {
      id: `${side[0]}-${Date.now()}`,
      author_id: member.id,
      author_name: member.name || "Anonymous",
      author_avatar: member.avatar || "",
      author_color: member.color || "",
      side,
      text,
      note: null,
      created_date: now(),
    };
    await base44.entities.Debate.update(debate.id, {
      arguments: [...(fresh.arguments || []), newArg],
      ...extra,
    });
  };

  const addFreeArgument = async (text) => {
    setPosting(true);
    try {
      await addArgument(openerSide, text);
      onPaid?.();
    } catch (e) {
      console.error("add argument failed", e);
    } finally {
      setPosting(false);
    }
  };

  // Challenger occupant posts another argument on their side.
  const addChallengerArgument = async () => {
    if (!respondText.trim() || posting) return;
    setPosting(true);
    try {
      await addArgument(challengerSide, respondText.trim());
      // Notify the proposer (server-side checks their preference + own-debate).
      if (debate.proposer_id && debate.proposer_id !== member.id) {
        base44.functions
          .invoke("notifyDebateResponse", { debateId: debate.id, origin: window.location.origin })
          .catch(() => {});
      }
      reload();
    } catch (e) {
      console.error("respond failed", e);
    } finally {
      setPosting(false);
    }
  };

  // Take an open slot — posts an argument on that side and claims the slot.
  const takeSlot = async (slot) => {
    if (!engageText.trim() || posting) return;
    setPosting(true);
    try {
      const fresh = await base44.entities.Debate.get(debate.id);
      const side = slot === "proposer" ? openerSide : challengerSide;
      const authorName = member.name || "Anonymous";
      const newArg = {
        id: `t-${Date.now()}`,
        author_id: member.id,
        author_name: authorName,
        author_avatar: member.avatar || "",
        author_color: member.color || "",
        side,
        text: engageText.trim(),
        note: null,
        created_date: now(),
      };
      const updates = {
        arguments: [...(fresh.arguments || []), newArg],
      };
      if (slot === "proposer") {
        updates.proposer_id = member.id;
        updates.proposer_name = authorName;
      } else {
        updates.challenger_id = member.id;
        updates.challenger_name = authorName;
      }
      const pFilled = slot === "proposer" ? true : !!fresh.proposer_id;
      const cFilled = slot === "challenger" ? true : !!fresh.challenger_id;
      updates.status = pFilled && cFilled ? "engaged" : "open";
      await base44.entities.Debate.update(debate.id, updates);
      // Notify the proposer when a challenger takes the open challenger slot.
      if (slot === "challenger" && fresh.proposer_id && fresh.proposer_id !== member.id) {
        base44.functions
          .invoke("notifyDebateResponse", { debateId: debate.id, origin: window.location.origin })
          .catch(() => {});
      }
      reload();
    } catch (e) {
      console.error("take slot failed", e);
    } finally {
      setPosting(false);
    }
  };

  // Either occupant can disengage, reopening their slot for someone else.
  // Their arguments stay as a record.
  const disengageSlot = async (slot) => {
    if (posting) return;
    const msg =
      slot === "proposer"
        ? "Disengage from this debate? Someone else will be able to take over the proposer side. Your arguments stay."
        : "Disengage from this debate? Someone else will be able to take over as challenger. Your arguments stay.";
    if (!window.confirm(msg)) return;
    setPosting(true);
    try {
      const fresh = await base44.entities.Debate.get(debate.id);
      const updates =
        slot === "proposer"
          ? { proposer_id: null, proposer_name: null }
          : { challenger_id: null, challenger_name: null };
      const pFilled = slot === "proposer" ? false : !!fresh.proposer_id;
      const cFilled = slot === "challenger" ? false : !!fresh.challenger_id;
      updates.status = pFilled && cFilled ? "engaged" : "open";
      await base44.entities.Debate.update(debate.id, updates);
      onPaid?.();
    } catch (e) {
      console.error("disengage failed", e);
    } finally {
      setPosting(false);
    }
  };

  const forkFree = async () => {
    if (!forkArg.trim() || posting) return;
    setPosting(true);
    try {
      await base44.functions.invoke("createDebate", {
        topic: forkArg.trim(),
        side: forkSide,
        parentDebateId: debate.id,
      });
      reload();
    } catch (e) {
      console.error("fork failed", e);
    } finally {
      setPosting(false);
    }
  };

  const voteBtn = (value, Icon, count, activeClass) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        castVote(value);
      }}
      disabled={!isMember || posting}
      className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-1 rounded-sm border transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        myVote === value ? activeClass : "border-border text-lead hover:text-ink"
      }`}
    >
      <Icon size={11} /> {count}
    </button>
  );

  return (
    <div className="border border-border bg-parchment rounded-sm p-5">
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex items-start gap-2 text-left group flex-1 min-w-0"
        >
          <ChevronRight
            size={16}
            className={`text-lead mt-1 shrink-0 transition-transform duration-300 ${expanded ? "rotate-90" : ""} group-hover:text-ink`}
          />
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead mb-1">
              {engaged
                ? "Engaged"
                : bothOpen
                ? "Open — both slots open"
                : proposerOpen
                ? "Open — awaiting proposer"
                : "Open — awaiting challenger"}
              <span
                className={`ml-2 ${
                  engaged ? "text-verdigris" : "text-copper"
                }`}
                title={engaged ? "Both slots filled" : "A slot is open"}
              >
                {seats}
              </span>
              {debate.parent_debate_id && (
                <span className="ml-2 normal-case tracking-normal font-body text-[11px] text-verdigris">
                  forked from “{parentTopic || "a deleted debate"}”
                </span>
              )}
            </p>
            <h3 className="font-heading text-lg font-light text-ink leading-snug">
              {debate.topic}
            </h3>
            <p className="font-body text-[11px] text-lead/60 mt-1 flex items-center gap-1.5">
              <DebateAvatar name={debate.proposer_name} avatar={proposerAvatar} size={16} />
              by {debate.proposer_name || "Anonymous"}
              {argCount > 0 && (
                <span className="ml-2 text-lead/40">
                  · {argCount} response{argCount === 1 ? "" : "s"}
                </span>
              )}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {voteBtn(1, ThumbsUp, upvotes, "border-verdigris text-verdigris bg-verdigris/5")}
          {voteBtn(-1, ThumbsDown, downvotes, "border-destructive text-destructive bg-destructive/5")}
        </div>
      </div>

      {expanded && (
        <>
          <div className="flex flex-wrap gap-3 mt-4 mb-4 text-xs">
            <span className="text-lead flex items-center gap-1.5">
              <DebateAvatar name={debate.proposer_name} avatar={proposerAvatar} size={18} />
              <span className="font-mono uppercase tracking-wide text-lead/60">
                Proposer:{" "}
              </span>
              {debate.proposer_name || "— open —"}
            </span>
            <span className="text-lead flex items-center gap-1.5">
              <DebateAvatar name={debate.challenger_name} avatar={challengerAvatar} size={18} />
              <span className="font-mono uppercase tracking-wide text-lead/60">
                Challenger:{" "}
              </span>
              {debate.challenger_name || "— open —"}
            </span>
          </div>

          <div className="space-y-1 mb-4">
            {(debate.arguments || []).map((a) => (
              <ArgumentCard
                key={a.id}
                argument={a}
                member={member}
                proposerId={debate.proposer_id}
                onDelete={deleteArgument}
                disabled={posting}
                note={showMediation ? mediation[a.id] : null}
                analyzing={mediating && !mediation[a.id]}
              />
            ))}
          </div>

          {!isMember ? (
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/50 border-t border-border pt-4">
              Unlock the forum to respond to or fork this debate.
            </p>
          ) : (
            <>
              {isProposer && (
                <div className="border-t border-verdigris/40 pt-4 mb-4">
                  <p className="font-body text-[11px] text-lead/70 mb-2">
                    Posting as {member.name || "Anonymous"} (Proposer —{" "}
                    {openerSide === "pro" ? "for" : "against"}).
                  </p>
                  <ArgumentForm
                    side={openerSide}
                    role="Proposer"
                    onSubmit={addFreeArgument}
                    disabled={posting}
                  />
                  <button
                    onClick={() => disengageSlot("proposer")}
                    disabled={posting}
                    className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300 disabled:opacity-50"
                  >
                    Disengage
                  </button>
                </div>
              )}

              {isChallenger && (
                <div className="border-t border-verdigris/40 pt-4 mb-4 space-y-2">
                  <p className="font-body text-[11px] text-lead/70">
                    Posting as {member.name || "Anonymous"} (Challenger —{" "}
                    {challengerSide === "pro" ? "for" : "against"}).
                  </p>
                  <textarea
                    value={respondText}
                    onChange={(e) => setRespondText(e.target.value)}
                    rows={3}
                    placeholder="Your response…"
                    className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris resize-none"
                  />
                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={addChallengerArgument}
                      disabled={!respondText.trim() || posting}
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {posting ? "Posting…" : "Post argument"}
                    </button>
                    <button
                      onClick={() => disengageSlot("challenger")}
                      disabled={posting}
                      className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300 disabled:opacity-50"
                    >
                      Disengage
                    </button>
                  </div>
                </div>
              )}

              {!isProposer && !isChallenger && (proposerOpen || challengerOpen) && (
                <div className="border-t border-border pt-4 space-y-2 mb-4">
                  <p className="font-body text-xs text-lead">
                    {bothOpen
                      ? "Both slots are open — pick a side to argue."
                      : "One slot is open — take it or fork."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {proposerOpen && (
                      <button
                        type="button"
                        onClick={() => setEngageSlot("proposer")}
                        className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm border transition-colors duration-300 ${
                          engageSlot === "proposer"
                            ? "border-verdigris text-verdigris bg-verdigris/5"
                            : "border-verdigris text-verdigris hover:bg-verdigris hover:text-parchment"
                        }`}
                      >
                        {openerSide === "pro" ? "Argue for" : "Argue against"}
                      </button>
                    )}
                    {challengerOpen && (
                      <button
                        type="button"
                        onClick={() => setEngageSlot("challenger")}
                        className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm border transition-colors duration-300 ${
                          engageSlot === "challenger"
                            ? "border-verdigris text-verdigris bg-verdigris/5"
                            : "border-verdigris text-verdigris hover:bg-verdigris hover:text-parchment"
                        }`}
                      >
                        {challengerSide === "pro" ? "Argue for" : "Argue against"}
                      </button>
                    )}
                  </div>
                  {engageSlot && (
                    <div className="space-y-2">
                      <p className="font-body text-[11px] text-lead/70">
                        Taking the {engageSlot === "proposer" ? "proposer" : "challenger"} slot —
                        arguing{" "}
                        {(engageSlot === "proposer" ? openerSide : challengerSide) === "pro"
                          ? "for"
                          : "against"}.
                      </p>
                      <textarea
                        value={engageText}
                        onChange={(e) => setEngageText(e.target.value)}
                        rows={3}
                        placeholder="Your opening argument…"
                        className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris resize-none"
                      />
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => takeSlot(engageSlot)}
                          disabled={!engageText.trim() || posting}
                          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {posting ? "Posting…" : "Post & take slot"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEngageSlot(null);
                            setEngageText("");
                          }}
                          className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isProposer && !isChallenger && !proposerOpen && !challengerOpen && (
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60 border-t border-border pt-4 leading-relaxed mb-4">
                  Both slots filled — fork to start your own, or wait for someone to disengage.
                </p>
              )}

              <div className="border-t border-border pt-4 space-y-3 mt-4">
                <button
                  onClick={() => setShowFork((v) => !v)}
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
                >
                  <GitFork size={12} />{" "}
                  {showFork ? "Hide fork" : "Fork this debate"}
                </button>
                {showFork && (
                  <div>
                    <p className="font-body text-[11px] text-lead/70 mb-1">
                      Fork this debate — your opening argument becomes the new
                      headline.
                    </p>
                    <div className="bg-secondary/30 border border-border rounded-sm px-3 py-2 mb-3">
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60 mb-0.5">
                        Original prompt
                      </p>
                      <p className="font-body text-sm text-ink leading-snug">
                        {debate.topic}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
                        Your stance:
                      </span>
                      <button
                        type="button"
                        onClick={() => setForkSide("pro")}
                        className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm border transition-colors duration-300 ${
                          forkSide === "pro"
                            ? "border-verdigris text-verdigris bg-verdigris/5"
                            : "border-border text-lead hover:text-ink"
                        }`}
                      >
                        For
                      </button>
                      <button
                        type="button"
                        onClick={() => setForkSide("con")}
                        className={`font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-sm border transition-colors duration-300 ${
                          forkSide === "con"
                            ? "border-verdigris text-verdigris bg-verdigris/5"
                            : "border-border text-lead hover:text-ink"
                        }`}
                      >
                        Against
                      </button>
                    </div>
                    <textarea
                      value={forkArg}
                      onChange={(e) => setForkArg(e.target.value)}
                      rows={3}
                      placeholder="Your opening argument…"
                      className="w-full bg-parchment border border-border rounded-sm px-3 py-2 font-body text-sm text-ink placeholder:text-lead/40 focus:outline-none focus:border-verdigris resize-none"
                    />
                    <div className="mt-2">
                      <button
                        onClick={forkFree}
                        disabled={!forkArg.trim() || posting}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {posting ? "Forking…" : "Fork debate"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {argCount > 0 && (
                <div className="border-t border-border pt-4 mt-4 flex items-center gap-2">
                  <Gavel size={12} className="text-lead" />
                  <button
                    onClick={toggleMediation}
                    disabled={mediating}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300 disabled:opacity-50"
                  >
                    {mediating
                      ? "Analyzing…"
                      : showMediation
                      ? "Hide mediation"
                      : "Show mediation"}
                  </button>
                </div>
              )}

              {canDelete && (
                <div className="border-t border-border pt-4 mt-4">
                  <button
                    onClick={deleteDebate}
                    disabled={posting}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-destructive hover:opacity-70 transition-opacity duration-300 disabled:opacity-50"
                  >
                    <Trash2 size={12} />
                    {posting ? "Deleting…" : "Delete this debate"}
                  </button>
                  <p className="font-body text-[10px] text-lead/60 mt-1">
                    You can delete for 24 hours after posting — after that, it's permanent.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}