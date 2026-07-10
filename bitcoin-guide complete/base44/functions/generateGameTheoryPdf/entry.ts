import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch the game theory cube image
    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/20fae6914_WhatsAppImage2026-07-07at0907288.jpeg');
    const imgBuf = await imgResp.arrayBuffer();
    const imgB64 = btoa(String.fromCharCode(...new Uint8Array(imgBuf)));
    const imgUrl = `data:image/jpeg;base64,${imgB64}`;

    // Site color theme
    const ink = [26, 29, 35];
    const verdigris = [46, 74, 63];
    const copper = [184, 115, 51];
    const parchment = [249, 247, 242];
    const lead = [140, 140, 140];

    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const PW = doc.internal.pageSize.getWidth();
    const PH = doc.internal.pageSize.getHeight();
    const M = 56;
    const CW = PW - M * 2;
    let y = M;

    function bg() {
      doc.setFillColor(parchment[0], parchment[1], parchment[2]);
      doc.rect(0, 0, PW, PH, 'F');
    }
    bg();

    // Cube image centered at top
    const isz = 72;
    doc.addImage(imgUrl, 'JPEG', (PW - isz) / 2, 36, isz, isz);
    y = 36 + isz + 28;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize('Game Theory and Bitcoin: A Strategic Framework', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 24;

    function space(n) {
      if (y + n > PH - M) {
        doc.addPage();
        bg();
        y = M;
      }
    }

    function heading(text) {
      space(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
      const lines = doc.splitTextToSize(text, CW);
      space(lines.length * 18 + 16);
      doc.text(lines, M, y);
      y += lines.length * 18 + 6;
      doc.setDrawColor(copper[0], copper[1], copper[2]);
      doc.setLineWidth(0.6);
      doc.line(M, y, M + 36, y);
      y += 18;
    }

    function para(text) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW);
      for (const line of lines) {
        space(15);
        doc.text(line, M, y);
        y += 15;
      }
      y += 8;
    }

    function bullet(label, text) {
      const indent = 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      space(15);
      doc.text('- ' + label, M, y);
      y += 15;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(text, CW - indent);
      for (const line of lines) {
        space(15);
        doc.text(line, M + indent, y);
        y += 15;
      }
      y += 6;
    }

    // --- CLEANED CONTENT ---

    heading('Introduction to Game Theory');
    para('Game theory is the study of strategic interactions where the outcome for each participant depends on the actions of others. Originally formalized by mathematician John von Neumann and economist Oskar Morgenstern in their 1944 work "Theory of Games and Economic Behavior," it has since become a foundational tool in economics, political science, evolutionary biology, and cryptographic systems design.');
    para('Key concepts include:');
    bullet('Players', 'The decision-makers in a system, each pursuing their own interests.');
    bullet('Strategies', 'The possible actions a player can take in any given situation.');
    bullet('Payoffs', 'The outcomes each player receives based on the combination of strategies chosen by all players.');
    bullet('Equilibrium', 'A stable state where no player benefits from unilaterally changing their strategy. The most famous example is the Nash Equilibrium, named after John Nash, where each player\'s strategy is optimal given the strategies of all other players.');
    para('Bitcoin, as a decentralized system with no central authority to enforce rules, relies heavily on game-theoretic incentives to ensure security, cooperation, and network stability. Every participant — miners, nodes, developers, and users — acts according to their own self-interest, yet the system\'s design channels that self-interest toward outcomes that benefit the network as a whole.');

    heading('1. Mining Incentives and the Nash Equilibrium');
    para('Bitcoin mining operates as a competitive game where miners choose to either follow the protocol or act maliciously. The incentives are structured so that rational miners are consistently better off following the rules:');
    bullet('Honest Mining', 'Miners receive block rewards (newly minted bitcoin) and transaction fees for producing valid blocks. This is the straightforward, profitable path.');
    bullet('Selfish Mining', 'A strategy where miners withhold discovered blocks to gain a lead over competitors. While theoretically possible, it requires significant hash power to execute profitably and risks losing all rewards if competitors find blocks during the withholding period.');
    bullet('51% Attack', 'If a miner controls over 50% of the network\'s hash power, they could potentially rewrite transactions or double-spend. However, the cost of acquiring and maintaining such dominance is astronomical — requiring billions in hardware and electricity — while the attack itself would crash Bitcoin\'s value, destroying the attacker\'s own holdings.');
    para('In equilibrium, rational miners follow the protocol because cheating is either too costly or self-defeating. The proof-of-work system ensures that the math always favors honesty: the expected return from honest mining exceeds the expected return from any attack strategy, given the enormous costs and risks involved. This is not a matter of trust or morality — it is cold economic calculus enforced by physics and mathematics.');

    heading('2. The Prisoner\'s Dilemma and Network Security');
    para('The classic Prisoner\'s Dilemma illuminates why miners and nodes act honestly. In the original formulation, two prisoners must independently choose to cooperate or betray each other. The rational strategy for each individually leads to a worse outcome for both — unless the game is repeated indefinitely, in which case cooperation emerges as the dominant strategy through reputation and reciprocity.');
    para('Bitcoin operates as an infinitely repeated game. If all participants validate transactions honestly, the network remains secure and valuable. If some attempt to cheat — through double-spending, invalid blocks, or censorship — the system includes powerful mechanisms to disincentivize such behavior:');
    bullet('Longest-Chain Rule', 'The network always accepts the chain with the most accumulated proof-of-work. Attackers must outcompete the entire honest network in real time, which becomes exponentially harder the longer the attack persists.');
    bullet('Proof-of-Work', 'Every block requires real energy expenditure to produce. Invalid blocks are rejected by nodes, meaning attackers pay the full electricity cost with zero reward.');
    bullet('Economic Cost of Betrayal', 'Any successful attack would be visible on-chain, immediately crashing confidence and price. The attacker\'s own bitcoin holdings and mining hardware would lose value — a self-destructive outcome.');
    para('Since rational players prioritize long-term profitability over short-term gains, cooperation (honest mining) remains the dominant strategy. The game is structured so that doing the right thing is not just morally correct — it is the most profitable strategy by a wide margin.');

    heading('3. Forks, Coordination, and Schelling Points');
    para('When the Bitcoin network faces disagreements about protocol rules, game theory governs how those conflicts resolve. Two types of forks represent different coordination games:');
    bullet('Hard Forks', 'A permanent divergence where the new rules are incompatible with the old. Bitcoin Cash (2017) is the most prominent example. A hard fork creates two competing chains, but only one can maintain sufficient economic support — miners, exchanges, and users must choose where to commit their resources. The chain with greater economic gravity absorbs the value.');
    bullet('Soft Forks', 'Backward-compatible upgrades that do not split the chain. Segregated Witness (SegWit, 2017) is the key example. Soft forks require miner and node cooperation to activate, but old nodes continue functioning without disruption. The game-theoretic challenge is achieving sufficient coordination without any central authority mandating the upgrade.');
    para('The network relies on Schelling Points — natural focal points for coordination that emerge without explicit communication. When thousands of independent actors must choose between competing options, they tend to converge on the most prominent, obvious, or salient solution. Bitcoin\'s core protocol rules function as a powerful Schelling Point: everyone benefits from remaining on the dominant chain, so rational actors coordinate around it without needing to trust or even communicate with each other.');
    para('This coordination through self-interest, rather than through authority or agreement, is one of Bitcoin\'s most elegant design achievements. It transforms potential chaos into spontaneous order.');

    heading('4. HODLing vs. Selling: A Strategic Game');
    para('Bitcoin holders engage in a game that resembles the Stag Hunt, a coordination game where collective action produces the best outcome for all, but individual defection is tempting when trust is low. In the context of Bitcoin:');
    bullet('If most users HODL (hold long-term)', 'Scarcity increases as available supply tightens, and Bitcoin\'s value appreciates. Long-term holders benefit from the collective restraint of the community.');
    bullet('If users panic sell', 'Prices drop sharply, triggering cascading liquidations and market instability. Sellers may escape with short-term gains, but at the cost of destroying the value they and others hold.');
    para('Since early adopters and long-term holders benefit from patience and conviction, strategic incentives align toward price appreciation over time. The fixed supply of 21 million bitcoins means that every holder who resists the temptation to sell contributes to the scarcity that benefits all holders collectively. This creates a positive feedback loop: as more people understand the game-theoretic advantage of holding, the supply tightens further, reinforcing the strategy.');
    para('The Stag Hunt dynamic explains why Bitcoin\'s volatility decreases over time: as the holder base grows and conviction deepens, panic selling becomes rarer, and price discovery becomes more orderly. The game naturally trends toward stability as participants learn through experience that cooperation (holding) is the winning strategy.');

    heading('Conclusion');
    para('Bitcoin\'s security, decentralization, and economic model rely on game-theoretic principles that were understood decades before Bitcoin\'s creation. What Satoshi Nakamoto achieved was the synthesis of these principles into a working system — combining proof-of-work, cryptographic signatures, and economic incentives into a network where rational self-interest reliably produces honest behavior.');
    para('Incentives for miners, users, and developers ensure that rational participants act in ways that preserve network integrity. The system does not require trust, virtue, or oversight — only that participants pursue their own economic interests. The result is a monetary network that is simultaneously the most adversarial system ever built and the most secure, demonstrating Bitcoin\'s resilience as a decentralized monetary system. The game theory is the security model.');

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    // Upload PDF
    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'GameTheory.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});