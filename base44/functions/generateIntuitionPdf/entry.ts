import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/f638bc053_WhatsAppImage2026-07-07at0907272.jpeg');
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
    const tl = doc.splitTextToSize('Intuition', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('The Intuition Behind the Bitcoin / Fiat Problem', PW / 2, y, { align: 'center' });
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

    // --- CONTENT ---

    heading('The Intuition of the Problem');
    para('The Bitcoin / fiat problem is deeply intuitive when you grasp the core principles of money and value exchange, yet it can feel elusive if approached superficially. At its heart, the problem highlights the fundamental flaws in fiat currencies and the solution Bitcoin provides as sound money. Understanding it requires stepping back to ask a simple but profound question: What is money?');
    para('The problem becomes intuitive the moment you realize that fiat operates as a tool of control — eroding purchasing power through inflation — while Bitcoin functions as a tool for freedom, preserving value over time and returning power to the individual. Once you see it, you cannot unsee it. The challenge is not complexity; it is the willingness to look.');

    heading('Fiat vs. Bitcoin');
    bullet('Fiat Money', 'Government-issued currency backed by nothing but trust in the issuing authority. It is created at will, inflates over time, and centralizes power in institutions like central banks. Its design ensures that wealth is quietly transferred from savers to the creators of money.');
    bullet('Bitcoin', 'Decentralized, scarce, and unforgeable — offering an alternative that aligns with the principles of sound money: limited supply, durability, divisibility, portability, and fungibility. No one can create more of it. No one can change the rules alone. Its value is preserved by mathematics, not by decree.');

    heading('If You Do Not Get It, You Have Not Tried');
    para('Understanding Bitcoin is not a matter of technical genius. It is a matter of curiosity and critical thinking. The problem is so intuitive it feels obvious once you see it — and if you do not, it is often because you have not tried, or you are afraid to confront uncomfortable truths about the fiat system you have been taught to trust.');
    bullet('Cognitive Inertia', 'Many people are so used to fiat systems that they rarely question them. Fiat feels natural only because it is ubiquitous. It takes effort to unlearn this conditioning and ask: Why does my money lose value over time?');
    bullet('Surface-Level Skepticism', 'Skeptics often dismiss Bitcoin as too volatile or a speculative asset without digging into why fiat systems are inherently unstable and exploitative. It is easy to mock Bitcoin\'s fluctuations while ignoring the silent theft of inflation.');
    bullet('Ignoring First Principles', 'Bitcoin\'s design forces you to think from first principles — how systems of trust, decentralization, and incentives work. If you have not engaged deeply with these ideas, you are missing the crux of the problem.');
    bullet('The Learning Curve', 'Bitcoin requires a willingness to learn about cryptography, economics, and history. Those who dismiss it prematurely often have not tried to understand these underlying elements.');

    heading('The Leaky Ship');
    para('Imagine being born into a leaky ship, taught that the constant need to bail water is normal and inevitable. Everyone around you bails. Your parents bailed. Their parents bailed. You never question the leaks — you simply accept them as the cost of being on the water. The idea that a ship could be built without leaks feels like fantasy.');
    para('Bitcoin is the realization that you do not have to stay on a sinking ship. There is a lifeboat with a better design — one that does not leak. If you do not see the need for the lifeboat, it is likely because you have accepted the leaks as normal and have not taken the time to examine alternatives. The lifeboat does not require you to understand naval engineering. It only requires you to notice that you are wet and that you do not have to be.');

    heading('Flawed Logic in Arguments Against Bitcoin');
    para('Most arguments against Bitcoin collapse under logical scrutiny. They rely on fallacies that feel persuasive on the surface but fail when examined:');
    bullet('Cherry Picking', 'Selectively using evidence to support an argument while ignoring contradictory evidence. Example: using the past to argue that human nature is unchanging, while selectively highlighting advancements that contradict the claim of stagnation.');
    bullet('Inconsistency Fallacy (Doublethink)', 'Holding two contradictory ideas at the same time without recognizing the conflict. Example: humans are inherently greedy and unchanging, yet we have progressed significantly as a civilization. Progress implies change — the two ideas cannot coexist.');
    bullet('Appeal to Tradition (Ad Antiquitatem)', 'Assuming something must continue to be true simply because it has always been so. The notion that money must be issued by a government because it always has been ignores that money existed long before governments did.');
    bullet('Cognitive Dissonance', 'Not a logical fallacy but a psychological mechanism — the discomfort of holding contradictory beliefs, often resolved by rationalization rather than confrontation. In this context, the tension between acknowledging fiat\'s failures and trusting it anyway is resolved by denial.');

    heading('Selective Historicism');
    para('If you were to coin a term for the pattern above, it would be Selective Historicism — the act of selectively using history to justify why something cannot change, while ignoring historical evidence of change. It is the intellectual equivalent of standing in a house that is on fire and arguing that fire has always been a part of houses, so there is no point looking for a building that does not burn.');
    para('The intuition behind Bitcoin cuts through all of this. It does not require you to win a debate. It requires you to ask honest questions and follow the answers wherever they lead. If you do that, the problem resolves itself — not because someone convinced you, but because the truth was always there, waiting for you to look.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Intuition.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});