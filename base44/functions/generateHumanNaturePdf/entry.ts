import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/33f2e24a2_WhatsAppImage2026-07-07at0907282.jpeg');
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
    const tl = doc.splitTextToSize('Human Nature', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('Designing for Fairness in a Flawed System', PW / 2, y, { align: 'center' });
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

    heading('Beyond the Ideological Loop');
    para('The conversation around human nature and Bitcoin often feels like an endless loop of philosophical debates, leaving many overwhelmed or disinterested. But at its core, Bitcoin is not about trying to change human nature or engage in ideological battles. It is a pragmatic system designed to work with humanity\'s inherent traits — particularly selfishness — by aligning incentives toward fairness, sustainability, and a more equitable future. To understand Bitcoin is to look beyond the noise and see it as a tool: not a perfect solution, but a step toward mitigating the harm caused by centralized monetary systems.');

    heading('The Fiat Weaponization of Selfishness');
    para('Fiat currencies, by design, centralize power and reward selfishness in ways that hurt everyone else. Inflation steals from savers. Monetary policy serves the few at the expense of the many. The system is fundamentally built on trust in institutions that repeatedly fail us. The selfishness baked into human nature is not the problem — the problem is a system that channels it toward exploitation rather than cooperation.');
    bullet('Inflation silently transfers wealth from those who hold the currency to those who create it.');
    bullet('Monetary policy is set by unelected central planners with no skin in the game.');
    bullet('Trust in institutions is demanded but never reciprocated — bailouts for banks, austerity for citizens.');
    bullet('The Cantillon effect ensures those closest to money creation benefit most, while those furthest away pay the price.');

    heading('Designing for Human Nature');
    para('Bitcoin is not claiming to fix human nature. It is offering a way to create a fairer playing field where selfishness does not lead to systemic harm. The genius of Bitcoin\'s design is that it does not require anyone to become less selfish — it simply redirects that selfishness toward productive, network-positive behaviour. Miners seek profit, and in doing so, they secure the network. Users seek to protect their wealth, and in doing so, they validate the system. Everyone acts in their own interest, and the system benefits.');
    bullet('Proof of Work aligns selfish mining incentives with network security — attacking the network costs more than participating honestly.');
    bullet('Fixed supply means no one can inflate their way to advantage at others\' expense.');
    bullet('Permissionless access means no gatekeeper can exclude or exploit participants.');
    bullet('Decentralisation ensures no single point of failure or control can be captured by the selfish or the powerful.');

    heading('Not an Ideology — a Lifeboat');
    para('This is not just about philosophy or debate — it is about action. Bitcoin does not require everyone to agree or even care for it to work. It is open, decentralized, and permissionless. You do not have to spend your days arguing about it to benefit from it. It is there as a lifeboat, not an ideology you have to pledge allegiance to.');
    para('So the question is not whether humans will stop being selfish — because they will not. The question is whether you want to stay in a system that weaponizes that selfishness against you, or whether you want to explore one that neutralizes it. Whether you choose to engage with it or not, Bitcoin does not care. It just runs.');

    heading('The Fiat False Paradigm');
    para('There is no debate regarding what money is, its purpose, and how it either benefits or degrades civilization. When you discuss literally any problem the world is facing, you are ultimately talking about a singular issue: money. The fiat false paradigm is what it is — we are all trapped and bound to its demands. But it can be repaired, and it is not a reflection of human nature. It is an accelerant of the worst parts of ourselves, exacerbated by an artificial environment of scarcity, panic, and fear.');

    heading('Scarcity, Panic, and Fear');
    para('Fiat money creates artificial scarcity in a world of abundance. When the currency is endlessly debased, the natural response is to hoard, compete, and distrust. This is not human nature at its core — it is human nature under duress. Remove the duress, and a different set of behaviours emerges. Sound money rewards cooperation, long-term thinking, and the peaceful exchange of value. It does not eliminate selfishness, but it removes the systemic pressure that turns neighbours into competitors.');

    heading('The Pathway to Repair');
    para('Ultimately, the question is not whether humanity can transcend selfishness, but whether we want to continue in a system that weaponizes it against us or explore alternatives that neutralize its harm. Fiat money amplifies fear, scarcity, and distrust, accelerating the worst parts of our nature. Bitcoin offers a decentralized, permissionless escape hatch — a lifeboat for those willing to step aboard.');
    para('Bitcoin does not ask you to be better. It does not ask you to be less selfish, less fearful, or less human. It simply offers a system where being human does not harm everyone else. That is the profound shift: not a moral revolution, but a structural one. The system changes, and the incentives follow. The incentives change, and the behaviour follows. Not because people became better, but because the game board rewarded a different kind of play.');
    para('Whether you choose to engage or not, Bitcoin will continue to operate — challenging the fiat-driven paradigm and offering a pathway to repair the system, not by denying human nature, but by designing for it.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'HumanNature.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});