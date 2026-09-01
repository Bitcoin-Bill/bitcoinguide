import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/72ed3784e_WhatsAppImage2026-07-07at0907284.jpeg');
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
    const tl = doc.splitTextToSize('Cognitive Dissonance: The Enemy Within', CW);
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

    function quote(text, author) {
      space(30);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(11);
      doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
      const indent = 24;
      const lines = doc.splitTextToSize(text, CW - indent * 2);
      for (const line of lines) {
        space(15);
        doc.text(line, M + indent, y);
        y += 15;
      }
      y += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      space(14);
      doc.text('- ' + author, M + indent, y);
      y += 22;
    }

    // --- CONTENT ---

    heading('The Nature of Cognitive Dissonance');
    para('Cognitive dissonance is a psychological concept that describes the mental discomfort or tension that arises when an individual holds two or more contradictory beliefs, attitudes, or values simultaneously, or when their behavior conflicts with their beliefs. This discomfort motivates people to reduce the inconsistency and achieve a state of internal harmony. But cognitive dissonance is not merely an academic concept — it is the mechanism by which intelligent people reject paradigm-shifting truths, including Bitcoin.');
    bullet('Inconsistency', 'A person experiences conflicting thoughts or actions. For example: believing in the importance of financial responsibility while watching fiat savings lose value and doing nothing about it.');
    bullet('Emotional Discomfort', 'The contradiction leads to feelings of unease, guilt, or anxiety — often dismissed or numbed rather than confronted.');
    bullet('Motivation to Resolve', 'Individuals are driven to reduce dissonance, but the strategies they choose often preserve the status quo rather than pursue truth.');

    heading('Strategies of Self-Deception');
    para('When confronted with information that challenges deeply held beliefs, the mind deploys predictable defense mechanisms. Understanding these mechanisms is the first step toward overcoming them:');
    bullet('Change Beliefs', 'Adjusting existing beliefs to align with comfortable actions. Example: believing that fiat money is fundamentally sound to justify not exploring alternatives.');
    bullet('Change Behavior', 'Altering actions to match beliefs — the hardest path, requiring courage and humility.');
    bullet('Add Justifications', 'Introducing new rationalizations to explain away the contradiction. Example: "Bitcoin is too volatile" or "it is too late to buy" — arguments that feel safe but collapse under scrutiny.');
    bullet('Trivialization', 'Minimizing the importance of the inconsistency. Example: "Money does not really matter that much" — a statement no one who has experienced financial hardship would make.');

    heading('The Enemy Within');
    para('There has never been an external enemy that was not, in some way, created by the enemy within. The system perpetuates its narrative through corrupted monetary protocols that shape the reality we live in. As long as humans can print money, they will continue to craft a reality that serves them, not you.');
    para('This is not another conspiracy fueled by divisive rhetoric meant to distract, divide, or mislead. It is about the enemy within each of us — the inherent tendency in human nature to be consumed and controlled by fear. Fear shuts down logic. Fear makes us vulnerable to manipulation. Fear keeps us in a system that exploits us, because the alternative — stepping into the unknown — feels more dangerous than the slow erosion we already endure.');

    heading('The Currency of Fear');
    para('What induces the most fear in us? Standing at the edge of a high cliff, watching a scary movie, finding ourselves in a dark room, or lost in an unfamiliar alley. Fear is something we can experience even in the safest of spaces, entirely within our own minds. Even in a room full of people, we can feel completely alone. Fear, in all its forms, leads to the same outcome: a loss of security, a loss of control. When faced with fear, our instincts take over — fight or flight — and logic is shut down. Panic ensues, and we become vulnerable, easily manipulated.');
    para('Now imagine living in a constant state of fear, where the mind is consistently subjected to stress and anxiety. We are surrounded by circumstances beyond our control that cultivate this fear — multi-generational trauma encoded in our DNA, the toll of domestic abuse, substance addiction, and narcissistic manipulation. The stress of financial strain is another major contributing factor. Rising debt, an escalating cost of living, and the uncertainty of being unable to provide for loved ones intensify this feeling of suffocation. Time becomes a rare commodity, and we are left gasping for air.');

    heading('Who Has Time?');
    para('The health implications are profound. Mentally, physically, and spiritually, our bodies deteriorate under constant strain. But there is another layer: those who appear wealthy are wealthy in a very specific way — they possess time. They are not burdened by the same financial constraints that keep most of us scrambling. Their true advantage is that their time cannot be stolen or co-opted.');
    para('It is not the independently wealthy we should fear. It is not those who are financially secure, but rather those who are kept in a perpetual state of fear and confusion. Those who live under duress or who numb themselves with temporary distractions become unreliable and easy targets for manipulation. After years of being taught to appeal to authority and consensus, we are easily coerced into accepting narratives that profit from our exploitation. We become numbers on a screen, searching for someone to blame, while conveniently ignoring the underlying system that keeps us all trapped.');

    heading('The Tactic of Deflection');
    para('The first tactic of a scam artist or manipulator is to deflect. When faced with an accusation, they attack, gaslight, and shift the focus. This is the essence of fear — the fear of losing control. What these manipulators desire most is your energy, your time, and control over your thoughts. The consequences are felt in our bodies — mental and physical health deteriorates, autoimmune disorders, gut issues, and stress-related conditions become rampant. If those in power had the resources to sell you the solutions to the problems they created, they would.');
    quote("This reflection was born from a conversation with someone close to me, someone I care deeply for. I tried, as gently as I could, to present a broader perspective on issues that I believe require reconsideration. I hope this helps you, too, if you feel trapped in an inescapable dystopian nightmare. Even if you disagree, I encourage you to challenge your own assumptions — because the enemy within is often the hardest to confront. This is the wisdom of insecurity.", 'The Author');

    heading('Bitcoin and the End of Cognitive Dissonance');
    para('Bitcoin resolves cognitive dissonance at the monetary level. It eliminates the contradiction between what money should be — a stable store of value — and what fiat money is — a depreciating instrument of control. With Bitcoin, you no longer need to hold two conflicting beliefs about your savings. You do not need to justify why your money loses value. You do not need to trivialize the importance of sound financial foundations.');
    para('The hardest part of adopting Bitcoin is not the technology or the economics. It is overcoming the cognitive dissonance that keeps intelligent people trapped in a failing system. The enemy within whispers that it is too late, too complicated, too risky. But the truth is simpler than the fear allows: Bitcoin is sound money, and sound money is the foundation of a free and stable life. Confronting the enemy within is the first step toward that freedom.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'CognitiveDissonance.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});