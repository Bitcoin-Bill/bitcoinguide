import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/92f95c703_WhatsAppImage2026-07-07at0907285.jpeg');
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
    const tl = doc.splitTextToSize('Value: Bitcoin as Sound Money', CW);
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

    heading('Energy as Proof of Value');
    para("Bitcoin's value is underpinned by several key factors that contribute to its robustness as a form of sound money. The most fundamental is energy consumption. As of late 2024, Bitcoin's annual energy consumption was estimated at approximately 177 terawatt-hours (TWh), comparable to the annual energy consumption of countries like Egypt, Malaysia, and Poland. While this often draws criticism, it plays a critical role in making Bitcoin valuable and secure.");
    bullet('Money Should Be Hard to Create', 'History shows that sound money — like gold — derives value partly because it is scarce and hard to produce. Bitcoin replicates this principle digitally through Proof of Work, requiring miners to expend real energy and resources to create new coins. This effort ensures that Bitcoin is not easily inflated, preserving its scarcity.');
    bullet('Security Through Energy', 'The energy consumed in Proof of Work supports Bitcoins decentralized security model. Miners compete to solve cryptographic puzzles, making it prohibitively expensive for any single entity to control or attack the network. This guarantees trust in Bitcoin without the need for intermediaries.');
    bullet('Energy as Proof of Value', 'Unlike fiat money, which can be printed at will, Bitcoins creation requires tangible input — energy. This makes Bitcoin fundamentally different from currencies that lose value due to overproduction or poor monetary policy. The energy cost is not a bug; it is the feature that makes Bitcoin trustworthy.');
    para('Proper context helps highlight why Proof of Work is an integral piece of the puzzle. Comparing Bitcoins energy use to the inefficiencies in traditional banking, gold mining, or the military infrastructure required to enforce fiat currency systems reveals that Bitcoin is remarkably efficient for what it provides: a global, permissionless settlement network.');

    heading('Network Nodes and Decentralization');
    para('The Bitcoin network comprises a vast number of nodes distributed globally, each playing a crucial role in maintaining the decentralized ledger. As of late 2024, there were approximately 240,670 global Bitcoin nodes across 170 countries. Every node independently verifies every transaction and block, ensuring that no central authority can alter the rules or seize funds. This distributed architecture is what makes Bitcoin censorship-resistant and impossible to shut down.');
    para('Bitcoin mining involves numerous participants worldwide, contributing to the networks security and transaction processing. As of mid-2024, the Bitcoin networks hash rate exceeded 400 exahashes per second (EH/s) — a measure of the total computational power securing the network. This hash rate represents the collective effort of thousands of mining operations across every continent, making Bitcoin the most computationally secure network in human history.');

    heading('Renewable Energy and Innovation');
    para('Bitcoin mining fosters a highly competitive market that drives innovation in alternative energy systems. Miners are incentivized to find the most cost-effective and sustainable energy sources to remain profitable. This competition not only accelerates advancements in renewable energy technologies but also helps drive down the cost of electricity and other energy resources for everyone. Mining operations increasingly colocate with stranded or wasted energy sources — flared gas, hydroelectric surplus, geothermal — turning otherwise wasted energy into productive value.');
    para('Innovative applications have also emerged where the heat generated by Bitcoin mining is repurposed for practical uses:');
    bullet('Commercial Heating', 'Establishments like Bathhouse, a spa in Manhattan, utilize Bitcoin mining to heat their pools, demonstrating an efficient integration of mining operations with business utilities.');
    bullet('Residential Heating', 'In certain regions, homeowners have adopted Bitcoin mining rigs to provide supplemental heating, effectively utilizing the byproduct heat from mining to warm their homes.');
    bullet('Stranded Energy Monetization', 'Remote energy sources — gas flaring at oil wells, surplus hydro in isolated regions — that were previously wasted can now be monetized through mining, improving overall energy efficiency.');

    heading('Attributes of Sound Money');
    para('Bitcoin embodies several characteristics that align with the classical principles of sound money:');
    bullet('Scarcity', 'The total supply of Bitcoin is capped at 21 million coins, ensuring scarcity that cannot be diluted. No individual, corporation, or government can create more.');
    bullet('Durability', 'As a digital asset secured by cryptographic proof, Bitcoin is not subject to physical degradation. A bitcoin stored today will exist in exactly the same state in a thousand years.');
    bullet('Portability', 'Bitcoin can be transferred globally in minutes, facilitating seamless transactions across borders. Billions of dollars can be moved for a fraction of traditional banking fees.');
    bullet('Divisibility', 'Each Bitcoin is divisible into 100 million smaller units called satoshis, allowing for transactions of any size, from large settlements to micro-transactions.');
    bullet('Uniformity', 'Every Bitcoin is identical in value and function, ensuring consistency across the network. There are no grades or qualities — one bitcoin is one bitcoin.');
    bullet('Acceptability', 'An increasing number of merchants, institutions, and individuals accept Bitcoin as a medium of exchange and store of value, enhancing its utility and liquidity.');

    heading('The Purest Form of Stored Energy');
    para('At its deepest level, Bitcoin represents the purest form of stored human energy ever devised. Every bitcoin in existence was created through the expenditure of real energy — electricity converted into computational proof. Unlike fiat money, which is created by decree and backed by nothing but the threat of force, Bitcoin is backed by thermodynamic law. You cannot fake it, you cannot print it, and you cannot seize it without the private keys.');
    quote("Proof of work is the only mechanism known to humanity that can convert energy into irreversible truth. Bitcoin is energy money — the hardest money ever created, because it is backed by the laws of physics rather than the promises of politicians.", 'Saifedean Ammous, The Bitcoin Standard');
    para('These elements collectively contribute to Bitcoins value proposition, reinforcing its status as a decentralized and resilient form of money. Energy, nodes, mining, and scarcity work together to create a monetary system that is trustless, censorship-resistant, and immune to the debasement that has destroyed every fiat currency in history. Bitcoin is not just valuable — it is value itself, distilled into digital form and secured by the fundamental laws of the universe.');

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Value.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});