import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/a301517c6_WhatsAppImage2026-07-07at0907275.jpeg');
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
    const tl = doc.splitTextToSize('Innovations: Zero to One', CW);
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

    heading('Zero to One vs. One to Many');
    para('The influence of sound money extends beyond encouraging savings — it fundamentally shapes the type of projects and innovations that societies invest in. Under a sound money regime, as seen during the late 19th century, individuals were more inclined toward long-term investments, supported by significant capital accumulation. These investments funded projects that required patience and foresight, with transformative impacts on human history. The era before World War I gave rise to some of the most important innovations in science and technology.');
    para('In The History of Science and Technology, Bunch and Hellemans identified 8,583 significant innovations throughout human history. Physicist Jonathan Huebner analyzed this data and found that while the total number of innovations increased in the 20th century, the per capita innovation rate peaked during the 19th century. Our modern world was largely built on the inventions created under the gold standard. The 20th century primarily focused on refining, scaling, and optimizing those transformative technologies.');
    para('In Zero to One, Peter Thiel articulates the distinction between inventing something entirely new ("zero to one") and scaling it ("one to many"). The pre-1914 sound money era exemplifies the zero-to-one phase. In contrast, the post-1914 world of government-controlled money has been characterized by scaling existing innovations. While scaling is valuable, it raises the question of why the modern era has seen so few zero-to-one breakthroughs.');

    heading('The 19th Century: A Golden Era');
    para('The remarkable innovations of the 19th century, financed by capital accumulated under the gold standard, laid the foundation for modern life. Key achievements include:');
    bullet('Sanitation and Public Health', 'Hot and cold running water, indoor toilets, plumbing, wastewater treatment, and central heating. These advancements eradicated many infectious diseases, enabling urban growth and improving global public health.');
    bullet('Energy and Industry', 'Electricity, the internal combustion engine, and mass production. The utilization of hydrocarbon energy revolutionized industrial society and formed the backbone of modern civilization.');
    bullet('Transportation', 'Automobiles (Karl Benz, 1885), airplanes (Wright Brothers, 1906), subways (Charles Pearson, 1843), and electric elevators (Elisha Otis, 1852). These innovations transformed mobility and urban living, making modern cities and global travel possible.');
    bullet('Medicine and Healthcare', 'Heart surgery, organ transplants, appendectomies, baby incubators, radiation therapy, anesthetics, aspirin, blood transfusions, and vitamins. These medical advancements were made possible by improved sanitation and energy infrastructure.');
    bullet('Industrial Materials and Chemicals', 'Petroleum-derived chemicals, stainless steel, and nitrogen-based fertilizers. These enabled mass industrialization and agricultural productivity, paving the way for plastics and other essential materials.');
    bullet('Telecommunications and Media', 'The telegraph (1843), telephone, wireless telegraphy, voice recording, color photography, and movies. The telegraph itself was a zero-to-one innovation that fundamentally transformed communication.');

    heading('Artistic Flourishing Under Sound Money');
    para("Sound money's influence extended to the arts, fostering a period of extraordinary cultural achievement. The low time preference of wealthy patrons during the Renaissance and the 19th century financed masterpieces that took years or decades to complete. Artistic movements like Baroque, Neoclassical, Romanticism, and Realism thrived, supported by sound money that encouraged meticulous craftsmanship.");
    para('Great artists like Michelangelo, Leonardo da Vinci, and Bach worked tirelessly to perfect their craft, producing works that stand the test of time. Michelangelo labored for four years painting the Sistine Chapel ceiling — a commitment possible only under a monetary system that rewarded patience and long-term dedication. In contrast, much modern art prioritizes shock value over enduring quality, a shift driven by the replacement of sound money with government-controlled fiat currencies.');

    heading('The Decline Under Fiat Money');
    para('The 20th century saw the rise of government funding in arts and innovation, often guided by political agendas rather than market forces. This shift replaced discerning patrons with bureaucrats, resulting in a decline in both artistic quality and groundbreaking innovation. Modern art, often criticized for its lack of depth and effort, reflects this transition. Works by artists like Mark Rothko and Jackson Pollock are emblematic of the reduced standards of the fiat money era.');
    para('Similarly, in innovation, the era of fiat money has been marked by fewer zero-to-one breakthroughs. Advances in technology and industrialization, which should have made groundbreaking innovations easier, have instead focused on refining existing technologies. This stagnation highlights the profound impact of monetary systems on societal priorities and the allocation of human talent.');

    heading('The Legacy of Sound Money');
    para("The 19th century's sound money era demonstrates the unparalleled potential of low time preference to drive both innovation and cultural flourishing. The capital accumulated through sound money enabled transformative advancements in science, technology, and the arts — many of which continue to shape our world today.");
    para('In contrast, the fiat money era has prioritized short-term gains, leading to a decline in groundbreaking innovation and artistic excellence. By returning to sound money principles, societies can once again foster long-term thinking, enabling a new era of transformative innovation and cultural achievement. Sound money is not just a financial tool — it is the foundation of human progress.');
    quote("Bitcoin is not just money. It is the reactivation of the civilizational mechanism that produced the greatest era of innovation in human history. By restoring low time preference, it restores the conditions under which zero-to-one breakthroughs become possible again.", 'Saifedean Ammous, The Bitcoin Standard');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Innovations.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});