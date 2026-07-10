import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/ba056143e_Newblock-2.png');
    const imgBuf = await imgResp.arrayBuffer();
    const imgBytes = new Uint8Array(imgBuf);
    let imgB64 = '';
    for (let i = 0; i < imgBytes.length; i += 8192) {
      imgB64 += String.fromCharCode(...imgBytes.slice(i, i + 8192));
    }
    imgB64 = btoa(imgB64);
    const imgUrl = `data:image/png;base64,${imgB64}`;

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

    const isz = 64;
    doc.addImage(imgUrl, 'PNG', (PW - isz) / 2, 36, isz, isz);
    y = 36 + isz + 24;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize('Bitcoin Self-Custody vs. Custodial', CW);
    doc.text(tl, PW / 2, y, { align: 'center' });
    y += tl.length * 26 + 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('A Comprehensive Guide to Securing Your Bitcoin', PW / 2, y, { align: 'center' });
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

    function subheading(text) {
      space(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW);
      space(lines.length * 16 + 10);
      doc.text(lines, M, y);
      y += lines.length * 16 + 4;
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

    function bullet(text, indent) {
      const ind = indent || 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW - ind);
      space(15);
      doc.text('\u2022', M + (ind === 14 ? 0 : 14), y);
      for (const line of lines) {
        space(15);
        doc.text(line, M + ind, y);
        y += 15;
      }
      y += 6;
    }

    function numberedBullet(num, text, indent) {
      const ind = indent || 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
      space(15);
      doc.text(String(num) + '.', M, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW - ind);
      for (const line of lines) {
        space(15);
        doc.text(line, M + ind, y);
        y += 15;
      }
      y += 6;
    }

    // --- CONTENT ---

    heading('What Is Self-Custody?');

    para('Self-custody means taking full control of your Bitcoin by holding your own private keys in a personal wallet — whether hardware, software, or paper. When you self-custody, no third party can freeze, seize, or restrict access to your funds. You are the bank.');

    subheading('Advantages');
    bullet('Ownership: Complete control over your funds without reliance on third parties.');
    bullet('Security: Protection against third-party risks such as hacks, insolvencies, or regulatory seizures of custodians.');
    bullet('Privacy: Greater transaction privacy, as your funds are not linked to an account with a custodial service.');
    bullet('Sovereignty: True financial independence, aligning with Bitcoin\'s core philosophy of self-determination.');

    subheading('Disadvantages');
    bullet('Responsibility: You are entirely responsible for securing and backing up your private keys. If you lose your keys, your Bitcoin is gone forever — there is no help desk to call.');
    bullet('Complexity: Requires a higher degree of technical understanding, particularly for hardware wallets and multisig setups.');

    heading('What Is Custodial Storage?');

    para('Custodial storage means a third party — an exchange, bank, or custodial service — holds your private keys and manages your Bitcoin on your behalf. You interact with your Bitcoin through their platform, but you do not hold the keys. This is functionally identical to a traditional bank account: you have a claim on the asset, but you do not possess it.');

    subheading('Advantages');
    bullet('Ease of Use: User-friendly interfaces and reduced technical knowledge requirements.');
    bullet('Convenience: Services like account recovery mechanisms, integrated trading platforms, and customer support.');
    bullet('Shared Responsibility: The custodian manages security, cold storage, and backups on your behalf.');

    subheading('Disadvantages');
    bullet('Risk of Loss: Subject to counterparty risks such as hacking, mismanagement, fraud, or bankruptcy (e.g., the collapse of FTX in 2022, which resulted in over $8 billion in customer losses).');
    bullet('Limited Control: Your funds are not accessible without the custodian\'s cooperation, potentially leading to censorship, account freezes, or withdrawal restrictions.');
    bullet('Privacy Concerns: Transactions are typically linked to your identity through KYC (Know Your Customer) requirements.');

    heading('Key Considerations');

    numberedBullet(1, 'Risk Appetite: Self-custody is better for those willing to take on personal responsibility, while custodial custody suits those seeking convenience and third-party management.');
    numberedBullet(2, 'Purpose: Long-term holding ("HODLing") favors self-custody, whereas frequent trading might lean toward custodial solutions.');
    numberedBullet(3, 'Trust: Self-custody removes the need to trust third parties entirely. Custodial services require trust in the custodian\'s integrity, security measures, and continued solvency.');

    para('Conclusion: The choice between self-custody and custodial depends on your individual preferences for security, control, and convenience. A hybrid approach — using both methods for different purposes — can offer a balance. For example, you might keep spending money on a custodial exchange for liquidity, while storing your long-term savings in cold storage that you control. The important thing is to understand the trade-offs and make a conscious, informed decision.');

    heading('Buying & Storing Bitcoin: A Practical Guide');

    para('There are several options for buying and securely storing Bitcoin, ranging from custodial wallets to non-custodial hardware and software solutions. Below is an overview of the available options for Canadians and international users.');

    subheading('Custodial Options (Exchanges & On-Ramps)');

    bullet('Shakepay: A Canadian Bitcoin exchange where you can purchase Bitcoin commission-free. Once purchased, you can transfer your Bitcoin to a private wallet for non-custodial storage. Regulated and CIRO-registered.');
    bullet('Bull Bitcoin: A non-custodial Canadian Bitcoin exchange and OTC desk — buy, sell, and spend Bitcoin with self-custody by default.');
    bullet('Strike: An all-in-one Bitcoin platform for buying, selling, sending, and spending. Licensed and regulated in the US. Not available in Canada.');
    bullet('Cash App, River.com, Relai.app, Swan.com: Additional on-ramps available for US and international users.');

    subheading('Non-Custodial Wallets');

    para('Important: Always back up your seed phrase on a durable medium such as a steel SEEDPLATE or Stamp Seed. Never store your seed phrase digitally — no photos, no cloud, no password manager. A seed phrase written on paper can survive a fire; a seed phrase stored on a phone might not.');

    numberedBullet(1, 'App Wallets (with Seed Phrases): After purchasing Bitcoin, transfer it to a private wallet where you control the keys. Examples include:');
    bullet('MUUN: A self-custodial wallet for Bitcoin and Lightning — all payments from a single balance with a mempool-based fee estimator. Available on iOS and Android.', 28);
    bullet('Phoenix Wallet: A non-custodial Bitcoin wallet with native Lightning support — send and receive instantly and cheaply. Available on iOS and Android.', 28);
    bullet('Manna Bitcoin: A self-custodial Bitcoin payments wallet with Lightning-fast payments, an integrated merchant toolkit, and built-in encrypted messaging. Available on iOS and Android.', 28);

    numberedBullet(2, 'Hardware Wallets (Cold Storage):');
    bullet('COLDCARD Q or Mk4 by Coinkite: Bitcoin-only hardware wallets with air-gapped operation, dual secure elements, and advanced features like duress wallets and brick codes. Pairs with Sparrow Wallet for secure, offline storage.', 28);
    bullet('Trezor Wallet: A hardware wallet with a desktop application. Trezor also integrates with third-party exchanges, enabling users to buy Bitcoin directly into their wallet.', 28);
    bullet('Jade Wallet by Blockstream: A hardware wallet with desktop, laptop, and phone compatibility for secure Bitcoin storage at an affordable price point.', 28);

    heading('Simple Bitcoin Transactions (For Beginners)');

    para('For a straightforward approach to buying and storing your first Bitcoin:');

    numberedBullet(1, 'Use Shakepay (Canada) or Strike (US) to send an e-transfer or bank transfer, buy Bitcoin, and send it to a private wallet like MUUN or Phoenix.');
    numberedBullet(2, 'For other regions, use Strike, Cash App, River.com, Relai.app, or Swan.com to purchase and transfer to your wallet.');
    numberedBullet(3, 'The entire process — from purchase to self-custody — can be completed within 15 minutes.');

    para('Remember: Bitcoin on an exchange is not your Bitcoin. It becomes your Bitcoin the moment you withdraw it to a wallet you control.');

    heading('Advanced Cold Storage Solutions');

    subheading('Sparrow Wallet (Desktop Software)');
    para('Sparrow Wallet is a desktop Bitcoin wallet built for security, privacy, and usability. It supports single-sig and multisig, all common hardware wallets, full coin and fee control, and built-in Tor. Free and open source. This is the recommended companion software for any hardware wallet.');

    subheading('Multisig with Unchained Capital');
    para('Unchained Capital provides multi-signature cold storage using collaborative custody. You hold your own keys while Unchained holds one, giving you institutional-grade security without giving up control. Their services include:');
    bullet('Two hardware wallets sent to you as part of the setup.');
    bullet('Remote assistance to set up multi-signature security through their web application.');
    bullet('A trading desk that settles directly to your vault.');
    bullet('Bitcoin-backed loans with zero rehypothecation.');
    bullet('A full inheritance system to pass your Bitcoin to your family.');

    subheading('Multisig with Casa');
    para('Casa offers multi-key vault security — multiple keys across devices and locations protect against hacks, wrench attacks, human error, device failure, and natural disasters. Includes white-glove support, inheritance planning, a dedicated OTC trading desk, and in-app buy/sell. Over $10 billion protected for 40,000+ clients since 2018.');

    heading('Seed Backup');

    para('Your seed phrase is the master key to your Bitcoin. If someone finds it, they can steal everything. If you lose it, you lose everything. Protect it accordingly.');

    bullet('SEEDPLATE: A steel seed backup plate by Coinkite — etch your 12 or 24-word recovery phrase into tough 2mm steel. Fire-resistant, crush-resistant, and designed to last forever.');
    bullet('Stamp Seed: A titanium seed stamping kit — stamp your full recovery words into solid titanium with deep, clear letters. Fire-resistant, crush-resistant, non-corrosive, and waterproof.');
    bullet('Never store your seed phrase digitally. No photos, no cloud backups, no password managers. Steel and paper only.');
    bullet('Consider splitting your backup across multiple geographic locations to protect against fire, flood, or theft.');

    heading('Bitcoin Mining as an Alternative');

    para('Bitcoin mining can be a rewarding way to acquire Bitcoin directly, but it comes with operational costs. Consider the following:');

    subheading('Individual Mining');
    bullet('If you are heating your home or business, mining equipment (ASICs) can offset heating costs by generating Bitcoin as a by-product. The heat is not wasted — it is the same heat your furnace would produce, but the Bitcoin is a bonus.');
    bullet('This solution is ideal for long-term savings, as Bitcoin rewards can cover operational expenses over time.');
    bullet('Devices like the Bitaxe or Nerdaxe are open-source, low-power miners designed for home use.');

    subheading('Business Applications');
    bullet('Some businesses utilize the heat generated by ASICs in innovative ways — heating greenhouses, district heating for buildings, water desalination, and drying lumber — turning mining into an efficient, dual-purpose operation.');
    bullet('Mining offers the potential for daily Bitcoin rewards, but it requires careful management of electricity costs and a long-term commitment.');

    heading('Running Your Own Node');

    para('For full sovereignty, consider running your own Bitcoin node. A node verifies transactions and blocks according to the rules you enforce — not the rules someone else tells you to trust. Options include:');

    bullet('Start9 — StartOS: Run your own private server with open-source software like Bitcoin Core, Electrum servers, and more, all from your own hardware.');
    bullet('Umbrel: A plug-and-play home server with umbrelOS — run your own Bitcoin node, store files privately, and self-host applications.');
    bullet('Running a node means you do not need to trust anyone else\'s copy of the blockchain. You verify everything yourself.');

    heading('Summary');

    para('Bitcoin buying and storage options vary widely based on your needs and goals. Whether you prefer a simple app wallet, advanced hardware security, multisig institutional custody, or even mining — there is a solution tailored to your preferences. The key principles to remember:');

    numberedBullet(1, 'Not your keys, not your coins. If you do not hold your private keys, you do not own Bitcoin — you have a claim against a custodian.');
    numberedBullet(2, 'Back up your seed phrase on durable metal. Never store it digitally.');
    numberedBullet(3, 'Start simple. A phone wallet like Phoenix or MUUN is fine for small amounts. Move to hardware wallets and multisig as your stack grows.');
    numberedBullet(4, 'Never share your seed phrase with anyone. No legitimate service will ever ask for it.');

    heading('For More Help & Information');

    para('Visit "What\'s The Problem?" — a guide demystifying why we all need Bitcoin. Click the \'Learn\' tab at the top of the page to explore more resources, essays, and guides.');
    para('You can also visit bitcoinsecurity.org for a comprehensive guide to Bitcoin self-custody, covering hardware wallets, metal backups, passphrases, privacy, and operational security best practices.');

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Bitcoin-Self-Custody-vs-Custodial.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});