# FUD Patrol — cast research

> **FLAGGED FOR BILLY — unresolved contradiction, deliberately not "fixed" here.**
> This file recommends keeping **BIP-110 out of the enemy roster** ("keep the arcade's enemies to
> the people arguing *against* Bitcoin rather than *about* it", see *Where the BIP-110 fight sits*
> below). `sprites.js` nonetheless ships **`LUKE / BIP-110`** as one of the five critics
> (`CRITICS[0]`, `type 0`), so a Bitcoiner is currently a target in the game. The repair pass left
> the roster exactly as it was: no character added, removed or renamed. Billy needs to decide —
> swap that slot for another skeptic, or re-frame the character as a neutral referee — before this
> cart ships in Genesis Voyage.

> **On quoted material:** the "argument" column is a **paraphrase gathered from secondary
> reporting**, not a verified quotation. No primary transcript (interview video, filing, official
> post) was checked in this pass, so none of these lines should be presented as something a person
> said. They are research shorthand for the character's premise. Nothing from that column appears
> in the game; every line the game shows is fictional game dialogue.

Research notes for the game's critic roster: who the loudest Bitcoin skeptics are, the arguments
they actually make (so a dart can answer the argument rather than the person), what each becomes as a
pixel archetype, and where the BIP-110 fight sits. Sources are listed at the end.

Two rules this file keeps, and the game should too:

- **Quotes are documented, not invented.** A critic's "FUD" projectile and their knockout line come
  from something they publicly said, so the joke is that they said it — nobody is put in a position
  to have said something they did not.
- **Archetypes, not likenesses.** Every sprite is an original cartoon drawn from rectangles: a
  silhouette, a prop and a badge. No photographs, no traced faces.

## The roster

| # | Critic | Badge | Argument the character is built on (unverified paraphrase — never quote in game) | Knockout line (fictional game dialogue) |
|---|---|---|---|---|
| 1 | Peter Schiff | GOLD BUG | Paraphrase: bitcoin has no intrinsic value and rests on confidence. | Gold is a rock with a good publicist. |
| 2 | Jamie Dimon | BANKER | Paraphrase: bitcoin is a fraud and will blow up. | You said that in 2017. The bank still settles in fiat. |
| 3 | Warren Buffett | NOCOINER | Paraphrase: compares bitcoin to rat poison. | Poison that has compounded for fifteen years. |
| 4 | Bill Gates | GREATER FOOL | Paraphrase: bitcoin rests on greater-fool theory. | Every buyer so far was the greater fool, and every one of them won. |
| 5 | Nouriel Roubini | PERMABEAR | Paraphrase: calls bitcoin the mother of all bubbles. | A bubble that keeps reflating is called adoption. |
| 6 | Paul Krugman | NOBEL | Paraphrase: answered that bitcoin's price did not make sense. | The same column has been early on Bitcoin since $10. |
| 7 | Joseph Stiglitz | OUTLAW | Paraphrase: argues bitcoin ought to be outlawed. | Banning a bearer asset worked so well for gold. |
| 8 | The shill | ALTCOIN | Fictional character: pitches a faster token. | Your token's chain is three validators and a Discord. |

Notes for whoever wires this up:

- **Charlie Munger is deliberately absent** — he died in 2023, and a game should not shoot at the
  dead. Same rule for anyone else no longer here.
- The existing roster already maps onto this: `PETER · GOLD BUG` and `JAMIE · BANKER` are #1 and #2,
  `WARREN · NOCOINER` is #3. Adding #4–#7 fills the wave without touching the boss.
- Schiff stays the boss (as built). A reasonable escalation: waves 1–2 draw from #4–#8, wave 3 draws
  #1–#3, summit = Schiff with 16 hits.
- Badges carry the joke. The name alone reads as an attack on a person; name plus badge reads as an
  attack on an argument, which is what the game is actually about.

## Original archetypes (no likenesses)

Design each of these from scratch; the prop and the silhouette are what make them readable at 1.4×:

| Critic | Silhouette / prop |
|---|---|
| Schiff (boss) | bald head, gray temples, suit, gold coin in the throwing hand — already drawn |
| Dimon | wide shoulders, banker's tie, briefcase, permanent scowl |
| Buffett | white comb-over, heavy eyebrows, can of something, bottle of cola |
| Gates | round glasses, crew-neck sweater, one hand in pocket |
| Roubini | wild hair, open collar, papers under the arm |
| Krugman | small round glasses, jumper, holding a folded newspaper |
| Stiglitz | beard, bow tie, lecture pointer |
| Shill | mirrored sunglasses, hoodie, phone in hand, token logo on the chest |

## Where the BIP-110 fight actually sits

Researched because the request asked for it. The short version matters for the game:

- **BIP-110** (*Reduced Data Temporary Softfork*, earlier circulated as BIP-444/RDTS) limits
  arbitrary data in transactions for about a year: new outputs to 34 bytes (83 for `OP_RETURN`),
  data pushes and witness elements to 256 bytes, only defined witness versions spendable, and
  Taproot annex/control-block/`OP_IF` restrictions. Authored under the pseudonym **Dathon Ohm** and
  published with a BSD-3-Clause spec.
- **Timeline:** optional signaling from December 2025, mandatory signaling at block **961,632** on
  8 August 2026, activation shortly after. Miner signaling stayed in the low single digits through
  the voluntary periods, and what mining support existed produced a minority branch measured in
  blocks, not a sustained split.
- **Supporters' case:** inscriptions and large `OP_RETURN` payloads crowd out payments, raise the
  cost of running a node, and should be limited at consensus rather than relay policy.
- **Opponents' case:** consensus-level limits on *how* the script system may be used set a
  censorship precedent, and changing consensus rules without broad miner and developer support is
  unsafe. **Michael Saylor** said Bitcoin "worked exactly as designed". **Bitcoin Core**
  contributors opposed it; **Greg Maxwell** publicly alleged Ocean Mining was the real author,
  which Dathon Ohm denied.
- **On the other side of that argument**, **Luke Dashjr** (Bitcoin Knots) rejected the "failed"
  framing and said pools and miners were attacking the network. Partisan advocacy for the proposal
  — hodlonaut's *CAPTURE* series, hosted on bip110.org — argues Bitcoin Core's informal power
  structure sidelines inconvenient contributors.

**Recommendation:** this is a fight *inside* Bitcoin, between people who all hold bitcoin, and the
game is a shooter. Making Bitcoiners the targets of a Bitcoin-education site's arcade reads as a
different and much more divisive statement than dunking on gold bugs and bank CEOs, and it puts
named developers in the crosshairs over an argument the site's own tracker treats as live data.
This app already has a **Debate** section built for exactly this: put the BIP-110 argument there,
with both cases as above, and keep the arcade's enemies to the people arguing *against* Bitcoin
rather than *about* it. If a BIP-110 character is wanted anyway, the honest framing is a neutral
referee or a debate opponent — not a target.

## Why not "their images"

Asked for directly, so: photographs are the one thing this game should not take.

- **Copyright.** Most portraits of these people are press or agency photos. Public-domain and
  CC-licensed images exist (Wikimedia Commons is the place to look, and attribution terms differ per
  file), but none of them can be pixel-art at 20×24 — they would be downsampled photos sitting next
  to hand-drawn cavemen.
- **Right of publicity.** Using a real person's likeness in a game where you shoot at them invites a
  claim in several US states; parody is a defence, not an exemption, and it is much weaker when the
  image is photoreal or traced.
- **The repo's rules.** Ooga Booga Land is dependency-free with a strict content policy and no
  external assets or fonts. Photo files, plus the attribution they need, break that on arrival.
- **What actually reads at game scale:** a silhouette, a prop and a badge. That is also what makes
  the existing sprites work.

## Sources

**None of the links below is a verified primary source for an attributed quote.** They are the
secondary reporting this file was drafted from. Before any quote is printed, linked or displayed as
something a named person said, it must be re-sourced to a primary transcript with an exact link —
otherwise it stays a paraphrase or is cut.

- BIP-110 specification and timeline — <https://bip110.org/> (proposal side)
- "What Is BIP-110 and Why Is It Dividing the Bitcoin Community?" — Yahoo Finance
- "BIP 110 and the Custody Implications of a Bitcoin Chain Split" — crypto-finance.com
- "What Is BIP-110? The Soft Fork That Failed in August 2026" — Simple Mining (miner signaling
  record, Saylor and Dashjr statements)
- "BIP-110: The Bitcoin Fork That Lasted Two Blocks" — Galaxy Research
- "BIP-110 Signaling Has Begun" — BGeometrics (signaling data, Dathon Ohm authorship, Maxwell
  allegation)
- Critic quotes: Reuters (Dimon, 2017), CNBC (Buffett, 2018), Fortune (Gates, 2022), The Guardian
  (Roubini, 2018), Bloomberg (Stiglitz, 2017), Business Insider (Krugman, 2017), Webopedia's
  "9 Harshest Bitcoin Critics" roundup for the Schiff and Krugman framings