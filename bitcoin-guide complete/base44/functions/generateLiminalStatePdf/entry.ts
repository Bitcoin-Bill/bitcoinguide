import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/934de8803_WhatsAppImage2026-07-07at0907281.jpeg');
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
    const tl = doc.splitTextToSize('The Liminal State of Fiat', CW);
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

    heading('The Threshold Between Real and Symbolic');
    para('Liminality refers to being in a state of transition — neither here nor there — a threshold. Fiat currency anchors our lives in this transitional space by requiring us to constantly negotiate between the real and the symbolic. The fiat paradigm creates a liminal state because it is a system that straddles the divide between material reality and abstract value. Unlike commodity-based currencies such as gold or silver, fiat money derives its worth entirely from collective belief and governmental decree rather than intrinsic value.');
    para('This detachment from tangible resources generates a pervasive sense of artificiality that undermines our connection to the natural world. We exist in a threshold state — suspended between the physical reality we evolved to inhabit and the abstract financial constructs that govern our daily lives. This liminality fosters existential disorientation, as it traps us between the natural world we were designed for and the constructed environment we have created.');
    bullet('Artificial Value Systems', 'Human labor, land, and natural resources are assigned arbitrary monetary values, creating a disconnect between what is real — a tree, clean air, clean water — and its perceived economic worth. A forest is valued more as lumber than as a living ecosystem.');
    bullet('Ephemeral Security', 'The stability of fiat money depends on fluctuating global markets, trust in governments, and abstract financial systems, leaving people in a perpetual state of uncertainty about their economic security. Nothing is permanent; everything can be devalued overnight by a policy decision.');

    heading('Cognitive Dissonance and the Human Mind');
    para('Cognitive dissonance arises because humans are fundamentally natural beings, yet we must navigate an artificial paradigm that often conflicts with our innate instincts. We evolved over hundreds of thousands of years to respond to tangible, immediate realities — food, shelter, safety, community. The fiat system requires us to operate within abstract systems that do not correspond to these instincts. This mismatch creates a persistent, low-grade unease that most people cannot name but feel every day.');
    bullet('Survival Instincts vs. Abstract Systems', 'Our brains evolved to respond to tangible, immediate survival concerns. Fiat currency requires us to work within abstract systems — earning and spending money, saving for retirement, navigating credit scores — that do not directly correspond to our survival instincts. The result is a persistent sense of unease we cannot quite identify.');
    bullet('Disconnection from Nature', 'By placing value on abstractions like GDP, stock prices, and interest rates, the fiat paradigm alienates us from natural cycles and rhythms. People find themselves working not to meet their real needs but to maintain their place within an artificial system. This fosters a sense of estrangement from our environment and from ourselves.');
    bullet('Worth Reduced to Productivity', 'Living in a world dominated by fiat systems means that our worth is often reduced to economic productivity. Our lives revolve around financial obligations rather than organic experiences. Over time, this creates psychological strain as people feel compelled to sustain a way of life that is both disconnected from their innate needs and increasingly precarious.');

    heading('The Slow Descent into Madness');
    para('As natural creatures, humans thrive in environments where cause and effect are clear, feedback is immediate, and value is inherent. The fiat system erodes these anchors. When the money itself is abstract and constantly debased, the relationship between effort and reward becomes distorted. Hard work no longer reliably leads to prosperity. Saving no longer reliably leads to security. The feedback loops that humans depend on for psychological stability are broken.');
    bullet('Perpetual Anxiety', 'The artificial volatility of fiat currency systems keeps people in a state of low-grade anxiety, unsure of their economic footing. Inflation erodes savings silently; asset bubbles inflate and burst unpredictably; job markets shift with abstract financial conditions rather than real human needs.');
    bullet('Hypernormalization', 'We accept artificial systems as normal while simultaneously feeling the internal discord they cause. Everyone senses something is wrong, yet the system continues. This collective cognitive dissonance creates a psychological tension that permeates every aspect of modern life — what the philosopher Jean Baudrillard called the simulacrum: a copy without an original.');
    bullet('Consumerism as Coping', 'The system encourages overconsumption to fill the void left by disconnection. Advertising, credit, and planned obsolescence all serve to keep people consuming, further exacerbating the insanity loop by promoting a lifestyle detached from nature and genuine human fulfillment.');

    heading('The Way Out');
    para('The fiat currency paradigm induces a liminal state that distorts human perception, fosters cognitive dissonance, and estranges us from our natural selves. This disconnection contributes to a collective erosion of mental health, as we live in increasingly artificial conditions that undermine our innate need for authenticity, stability, and connection to the natural world. The result is a creeping insanity — a subtle but pervasive unraveling of what it means to be human.');
    quote("Sound money reconnects us to reality. When money is rooted in physical energy and mathematical truth rather than decree and belief, the feedback loops between effort and reward are restored. Bitcoin is not just better money — it is a path back to sanity.", 'Saifedean Ammous, The Bitcoin Standard');
    para('Bitcoin offers an exit from the liminal state. Its value is not derived from collective belief or governmental decree but from thermodynamic proof — energy expended, mathematics verified, scarcity enforced by code. It reconnects money to reality, restoring the relationship between effort and reward, between value and truth. By adopting sound money, we step out of the threshold and back into a world where cause and effect are clear, where value is inherent, and where the future can be planned with confidence rather than feared.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'LiminalState.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});