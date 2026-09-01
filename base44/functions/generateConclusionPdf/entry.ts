import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/3433cc80b_WhatsAppImage2026-07-07at090727copy.jpeg');
    const imgBuf = await imgResp.arrayBuffer();
    const imgB64 = btoa(String.fromCharCode(...new Uint8Array(imgBuf)));
    const imgUrl = `data:image/jpeg;base64,${imgB64}`;

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

    const isz = 72;
    doc.addImage(imgUrl, 'JPEG', (PW - isz) / 2, 36, isz, isz);
    y = 36 + isz + 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize('Conclusion', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('A Synthesis of the Bitcoin Guide', PW / 2, y, { align: 'center' });
    y += 28;

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

    function bullet(text) {
      const indent = 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW - indent);
      space(15);
      doc.text('-', M, y);
      for (const line of lines) {
        space(15);
        doc.text(line, M + indent, y);
        y += 15;
      }
      y += 6;
    }

    // --- CONTENT ---

    heading('Introduction');
    para('Bitcoin represents a radical shift in the perception and operation of money. As a decentralized, deflationary, and digitally scarce asset, it offers an alternative to fiat monetary systems that have long governed global economies. This synthesis brings together the economics, philosophy, and technology explored throughout this guide — from the evolution of money and game theory to cognitive dissonance and human nature — into a unified argument for Bitcoin\'s transformative potential in fostering economic fairness, sustainability, and individual sovereignty.');

    heading('Sound Money and Low-Time Preference');
    para('Bitcoin embodies the principles of sound money: scarcity, divisibility, portability, and durability. Unlike fiat currencies, which erode value through inflation, Bitcoin promotes low-time-preference behaviours — encouraging savings, long-term planning, and sustainable investment. This foundational principle is critical for economic progress and civilisational growth, as the gold standard era demonstrated and as Austrian economic theory has long argued. When money holds its value, people can afford to think beyond the next paycheck. Civilisation itself is built on the surplus that sound money makes possible.');
    bullet('Scarcity: 21 million coins, enforced by mathematics, not policy.');
    bullet('Durability: immutable ledger, resistant to manipulation or erosion.');
    bullet('Portability: globally transferable at the speed of light, without intermediaries.');
    bullet('Divisibility: each coin divisible to 100 million satoshis, enabling any transaction size.');

    heading('Deflation and Economic Efficiency');
    para('Fiat economists treat deflation as the enemy, but this fear is misplaced. Deflation is simply the natural consequence of productivity gains — when things become cheaper to produce, prices should fall, and everyone benefits. Bad deflation, the destructive kind, is the unwind of credit bubbles that only exist because fiat enables endless lending. In a society with honest money, the number should go down. Wages would rise in real terms even as nominal prices fall, because each unit of money represents more human progress.');

    heading('Human Nature and Incentive Design');
    para('Bitcoin does not aim to change human nature. It works within its constraints by aligning incentives toward fairness and sustainability. By eliminating the centralized control inherent in fiat systems, Bitcoin neutralizes the destructive impact of greed and fear-driven monetary policies. The selfishness that fiat weaponizes against you becomes productive in Bitcoin — miners seek profit and secure the network; users seek to protect their wealth and validate the system. Everyone acts in their own interest, and the system benefits.');

    heading('The Fiat Liminal State');
    para('The fiat system perpetuates societal manipulation through misinformation and misdirection. By normalizing economic instability and scarcity, it conditions individuals to accept systemic flaws while stifling critical engagement with alternative models like Bitcoin. This cognitive dissonance — the psychological discomfort of holding two contradictory beliefs about money — is both a psychological and structural barrier to progress. People know something is wrong, but they cannot articulate what, because the system itself is designed to make the abnormal feel normal.');
    bullet('Inflation is reframed as a necessary tool, never as silent theft.');
    bullet('Economic crises are treated as natural disasters, never as policy failures.');
    bullet('Distrust in institutions is pathologized, never validated.');
    bullet('The leaks in the ship are accepted as inevitable, never questioned.');

    heading('Zero-to-One Innovation');
    para('Bitcoin\'s emergence represents a zero-to-one innovation — a foundational shift akin to the groundbreaking advancements of the nineteenth century under the gold standard. It is not an incremental improvement on fiat; it is a category creation. Its decentralized architecture fosters innovation in energy systems, financial inclusion, and technological development, contrasting with the fiat era\'s focus on scaling existing technologies and preserving incumbents. The last era of sound money produced the industrial revolution, the telegraph, the railroad, and the greatest explosion of human flourishing in history. There is no reason to believe this era will be different.');

    heading('Energy and Security');
    para('Criticism of Bitcoin\'s energy consumption often overlooks its essential role in securing the network and maintaining decentralization. Proof of Work ensures resistance to manipulation, and competitive mining drives innovation in renewable energy and efficient resource utilization. Far from being wasteful, Bitcoin mining is the most flexible energy consumer on the planet — it can be deployed at stranded energy sources, curtailed during peak demand, and used to monetize energy that would otherwise be wasted. What critics call inefficiency is in fact the catalyst for progress.');

    heading('Self-Custody and Sovereignty');
    para('Bitcoin enables financial sovereignty through self-custody, empowering individuals to control their wealth without reliance on intermediaries. While custodial services offer convenience, they reintroduce counterparty risks, potentially undermining Bitcoin\'s core philosophy of decentralization and personal responsibility. Not your keys, not your coins — the phrase is simple because the principle is fundamental. If you entrust your Bitcoin to a third party, you have not exited the fiat system; you have merely found a new banker.');

    heading('Gresham\'s Law in Action');
    para('In the coexistence of fiat and Bitcoin, Gresham\'s Law manifests as individuals hoard Bitcoin — the good money — while spending fiat — the bad money. This dynamic underscores Bitcoin\'s role as a store of value and its potential to disrupt traditional monetary systems over time. But the inverse, Thiers\'s Law, is the deeper truth: as bad money collapses, good money rises to take its place. The transition is gradual, then sudden. Those who hoarded good money will find themselves holding the only money that still functions.');

    heading('Redefining Value');
    para('Bitcoin challenges traditional notions of value by tying monetary worth to energy expenditure and decentralized consensus. This paradigm shift reconnects economic activities with tangible realities, fostering a more grounded and equitable financial system. Money is not an abstraction decreed by authority. It is stored human energy — the proof of work, the time, the ingenuity that went into earning it. When money reflects energy, economic activity reflects reality.');

    heading('Healing the Enemy Within');
    para('The transition from fiat to Bitcoin addresses deeper societal and psychological issues: fear, insecurity, and dependence. By promoting transparency, fairness, and individual empowerment, Bitcoin serves as a tool for reclaiming autonomy and fostering collective well-being. The enemy within — the fear that keeps us trapped in exploitative systems — loses its grip when we have a monetary alternative that cannot be weaponized against us. Sound money does not solve every problem, but it removes the systemic pressure that turns good people into anxious, competitive, and fearful ones.');

    heading('The Synthesis');
    para('Bitcoin\'s transformative potential lies in its ability to address the systemic flaws of fiat currencies while fostering economic resilience, innovation, and personal sovereignty. By aligning incentives with long-term progress and fairness, it offers a pathway to repair the harm caused by centralized monetary systems. Embracing Bitcoin requires overcoming cognitive inertia, engaging with first principles, and recognizing its role as a lifeboat — a decentralized, permissionless alternative to the status quo.');
    para('As humanity stands at the threshold of a new monetary paradigm, Bitcoin represents an opportunity to redefine value, rebuild trust, and create a more equitable future. The question is not whether Bitcoin will succeed — it already has. The question is whether we will rise to the challenge of understanding and utilizing it to its fullest potential. The lifeboat is here. The leaks are visible. The only question that remains is whether you will step aboard.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Conclusion.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});