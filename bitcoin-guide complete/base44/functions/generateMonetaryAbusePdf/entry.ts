import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/a0cb94b55_WhatsAppImage2026-07-07at090728.jpeg');
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
    const tl = doc.splitTextToSize('Monetary Abuse', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('The Parallels Between Centralized Banking and Narcissistic Abuse', PW / 2, y, { align: 'center' });
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

    function parallel(num, title, fiatText, narcText) {
      space(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      doc.text(num + '. ' + title, M, y);
      y += 18;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
      doc.text('Fiat Currency:', M, y);
      y += 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const fl = doc.splitTextToSize(fiatText, CW);
      for (const line of fl) {
        space(15);
        doc.text(line, M, y);
        y += 15;
      }
      y += 4;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(copper[0], copper[1], copper[2]);
      doc.text('Narcissistic Abuse:', M, y);
      y += 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const nl = doc.splitTextToSize(narcText, CW);
      for (const line of nl) {
        space(15);
        doc.text(line, M, y);
        y += 15;
      }
      y += 14;
    }

    // --- CONTENT ---

    para('Both fiat currency systems and narcissistic abuse rely on constructed realities, exploitation, and control. They thrive on dependence, misinformation, and the erosion of individual autonomy. The comparison is metaphorical, but it highlights the manipulative structures and psychological dynamics that underpin both phenomena. Recognising these parallels is the first step toward reclaiming your autonomy — financial, emotional, and spiritual.');

    parallel('1', 'Illusion of Value and Self-Worth',
      'Fiat money has no intrinsic value; its worth is based entirely on belief and trust in the issuing authority. Central banks manipulate this trust through inflation, quantitative easing, and interest rates. People are forced to operate within this system, relying on something that exists only because they are told to believe in it.',
      'Narcissists project an illusion of superiority and charm to manipulate others into depending on them for validation. Their value is constructed and maintained through the victim\'s belief in their false self, which the narcissist carefully cultivates.');

    parallel('2', 'Control Through Scarcity and Dependency',
      'Centralized banks control the supply of money, creating artificial scarcity or abundance to maintain dominance. By manipulating credit, interest rates, and inflation, they create cycles of boom and bust, leaving people in a constant state of financial dependence and vulnerability.',
      'Narcissists control their victims by instilling a sense of dependence. They manipulate through withholding affection, approval, or resources, creating an environment where the victim feels unable to thrive without the abuser.');

    parallel('3', 'Exploitation for Self-Gain',
      'Centralized banking systems disproportionately benefit those in power. Governments and elite institutions profit from the creation of money through fractional-reserve banking and inflation, while the general population bears the cost through diminished purchasing power and economic instability.',
      'Narcissists exploit their victims for personal gain — whether emotional, financial, or social. They take more than they give, draining the victim\'s resources to fuel their own ego and desires.');

    parallel('4', 'Gaslighting and Misdirection',
      'Central banks obscure the truth about monetary policies and economic realities through complex jargon and misinformation. Inflation, for example, is framed as a necessary economic tool, despite eroding wealth. This creates confusion and discourages people from questioning the system.',
      'Gaslighting is a hallmark of narcissistic abuse. Narcissists distort reality, making their victims doubt their perceptions and sanity. This keeps the victim off-balance and less likely to challenge the abuse.');

    parallel('5', 'Cycles of Boom and Bust — The Push-Pull Dynamic',
      'Economic cycles created by centralized banking mirror the push-pull dynamic of abusive relationships. Periods of growth (love-bombing) are followed by recessions and crises (devaluation), keeping people in a state of uncertainty and compliance.',
      'Narcissists alternate between idealizing and devaluing their victims. This intermittent reinforcement creates a toxic bond, where the victim clings to fleeting moments of validation while enduring long stretches of abuse.');

    parallel('6', 'Erosion of Autonomy',
      'By design, centralized banking systems limit individual autonomy. People are coerced into participating in a system where their wealth and economic freedom are subject to the whims of policymakers and inflation.',
      'Victims of narcissists lose their sense of autonomy as the abuser erodes their self-esteem and independence. The narcissist positions themselves as the sole source of stability, further entrapping the victim.');

    parallel('7', 'Infinite Growth at Others\' Expense',
      'Central banks operate on a model that demands perpetual economic growth, often at the expense of the environment, societal well-being, and individual financial stability. This unsustainable model prioritizes systemic dominance over long-term health.',
      'Narcissists pursue endless ego validation, using others as tools to fuel their need for admiration and superiority. This parasitic dynamic is inherently unsustainable, leading to the deterioration of the victim\'s well-being.');

    parallel('8', 'Escape is Discouraged',
      'Alternatives like decentralized cryptocurrencies challenge the dominance of fiat systems, but such efforts are often met with resistance, regulation, and stigma. The centralized system fights to maintain its control.',
      'When victims attempt to leave, narcissists often retaliate through smear campaigns, hoovering (pulling the victim back in), or other manipulative tactics. They fear losing control over their source of supply.');

    heading('The Exit: Sound Money as Liberation');
    para('Escaping either system requires awareness, resilience, and a significant shift in perspective. Bitcoin offers something unprecedented: a monetary system that cannot be manipulated, inflated, or weaponized against you. It has no issuer, no central authority, no false self to maintain. Its supply is fixed, its rules are transparent, and its verification is open to all.');
    para('Just as a victim of narcissistic abuse must rebuild their sense of self-worth from the ground up, the holder of sound money must rebuild their understanding of value from first principles. The process is uncomfortable. It requires confronting beliefs you did not know you held. But on the other side is autonomy — the freedom to store your energy in something that cannot be taken, debased, or used to control you.');
    para('The parallels between monetary abuse and narcissistic abuse are not a coincidence. They are the same pattern — the exploitation of trust and the weaponization of dependency — operating at different scales. Breaking free from one prepares you to recognise the other. Sound money is not just an economic decision; it is an act of reclaiming your autonomy from every system that would exploit your dependence.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'MonetaryAbuse.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});