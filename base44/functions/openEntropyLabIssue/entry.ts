import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const REPO = 'w-s-bitcoin/entropylab';

const ISSUE_TITLE = 'Fix: card shuffle suit sometimes stays selected after a tap';

const ISSUE_BODY = `## Summary

In the **Cards** input mode, tapping a rank (e.g. \`A\`) then a suit (e.g. \`♥\`) usually commits the card and resets the pad for the next one. Intermittently the suit button keeps its \`.active\` (orange) state and **no card is committed** — you have to tap the suit again. Reported by a tester on the live site.

## Root cause

A single physical tap dispatches **two** events to the pad handler: the touch/pointer event (\`touchend\` / \`pointerup\`) **and** the synthesized \`click\` the browser fires afterward. The commit handler ran twice on one tap:

1. First run → commits the card, clears both \`.active\` states, advances.
2. Second run → re-toggles the suit's \`.active\`, then no-ops the commit because no rank is selected anymore → **pad left half-selected, suit bold.**

## Proposed fix

- Route the pad through \`click\` only; \`preventDefault()\` on \`touchend\` / \`pointerup\` so the browser does **not** synthesize a second \`click\`.
- Clear \`.active\` and advance **synchronously** on commit, so the pad never rests in a half-selected state.
- Add a per-pad commit guard so a double-dispatched \`click\` is ignored.

## Repro

Cards mode → tap \`A\` → tap \`♥\`. Repeat ~20×.

- **Before:** roughly 1 in N taps leaves the suit bold and drops the card.
- **After:** every tap commits exactly one card and the pad resets.

## Notes

- No change to the entropy / hashing path — only the pad's event wiring.
- The built \`entropylab.html\` is generated; this edits the source module that wires \`.card-suit-pad\` / \`.card-rank-pad\`. Rebuild to regenerate the standalone file.

## Reference implementation

The names below are illustrative — match them to the real module's identifiers. The important parts are the three changes marked (1)(2)(3).

\`\`\`js
// Reference fix for the EntropyLab Cards input pad.
//
// Drop this logic into the source module that wires \`.card-suit-pad\` and
// \`.card-rank-pad\` (the built entropylab.html is generated from that source).
// The names below are illustrative — match them to the real module's
// identifiers. The important parts are the three changes marked (1)(2)(3).

export function wireCardPad({ suitPad, rankPad, onCommit }) {
  // (3) Per-pad commit guard: a double-dispatched click is ignored so a single
  // physical tap never commits twice.
  let committing = false;

  let selectedSuit = null; // button element currently .active in suitPad
  let selectedRank = null; // button element currently .active in rankPad

  const setActive = (pad, button) => {
    pad.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
    if (button) button.classList.add("active");
  };

  const clearSelection = () => {
    setActive(suitPad, null);
    setActive(rankPad, null);
    selectedSuit = null;
    selectedRank = null;
  };

  const tryCommit = () => {
    if (committing) return;          // (3) ignore a double-dispatched event
    if (!selectedSuit || !selectedRank) return; // need both halves of the card

    committing = true;
    try {
      // (2) Clear + advance synchronously so the pad never rests half-selected,
      // even if a stray second event lands before the (async) hash resolves.
      const suit = selectedSuit.dataset.suit;
      const rank = selectedRank.dataset.rank;
      clearSelection();
      onCommit({ suit, rank });       // onCommit may await hashing; that's fine
    } finally {
      committing = false;
    }
  };

  const handleSuit = (button) => {
    selectedSuit = button;
    setActive(suitPad, button);
    // Selecting a suit does not commit; wait for the rank. If a rank was
    // already chosen (user tapped rank first), commit now.
    if (selectedRank) tryCommit();
  };

  const handleRank = (button) => {
    selectedRank = button;
    setActive(rankPad, button);
    if (selectedSuit) tryCommit();
  };

  // (1) Route through click only and suppress the synthesized second event.
  // Without this, touchend/pointerup + click fire the handler twice per tap.
  const killSynthetic = (event) => event.preventDefault();

  suitPad.addEventListener("touchend", killSynthetic, { passive: false });
  rankPad.addEventListener("touchend", killSynthetic, { passive: false });
  suitPad.addEventListener("pointerup", killSynthetic);
  rankPad.addEventListener("pointerup", killSynthetic);

  suitPad.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) handleSuit(button);
  });
  rankPad.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) handleRank(button);
  });

  return { clearSelection };
}
\`\`\`

Opening this as an issue rather than a PR since the reference fix uses illustrative names — happy to adapt it to the real source module and open a PR if that's preferred.
`;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'bitcoin-guide-base44',
      },
      body: JSON.stringify({
        title: ISSUE_TITLE,
        body: ISSUE_BODY,
      }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!res.ok) {
      return Response.json({ error: 'GitHub API error', status: res.status, details: data }, { status: 502 });
    }

    return Response.json({ ok: true, issue_url: data.html_url, issue_number: data.number });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}