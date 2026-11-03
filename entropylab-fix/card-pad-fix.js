// Reference fix for the EntropyLab Cards input pad.
//
// Drop this logic into the source module that wires `.card-suit-pad` and
// `.card-rank-pad` (the built entropylab.html is generated from that source).
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