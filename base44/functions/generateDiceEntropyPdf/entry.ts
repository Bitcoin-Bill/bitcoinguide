import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { jsPDF } from 'npm:jspdf@4.0.0';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const ink = [26, 29, 35];
    const verdigris = [46, 74, 63];
    const copper = [184, 115, 51];
    const parchment = [249, 247, 242];
    const lead = [140, 140, 140];
    const redDark = [153, 27, 27];
    const redBg = [254, 242, 242];

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

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize('Bitcoin Seed Dice & Restore Guide', CW);
    doc.text(tl, PW / 2, y + 10, { align: 'center' });
    y += tl.length * 24 + 20;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('Offline instructions for generating a Bitcoin seed phrase with physical dice', PW / 2, y, { align: 'center' });
    y += 24;

    doc.setDrawColor(copper[0], copper[1], copper[2]);
    doc.setLineWidth(0.8);
    doc.line(PW / 2 - 30, y, PW / 2 + 30, y);
    y += 24;

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
      doc.setFontSize(10.5);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW);
      for (const line of lines) {
        space(15);
        doc.text(line, M, y);
        y += 14;
      }
      y += 8;
    }

    function bullet(text, indent) {
      const ind = indent || 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW - ind);
      space(15);
      doc.text('\u2022', M + (ind === 14 ? 0 : 14), y);
      for (const line of lines) {
        space(14);
        doc.text(line, M + ind, y);
        y += 14;
      }
      y += 6;
    }

    function numberedItem(num, text, indent) {
      const ind = indent || 20;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(verdigris[0], verdigris[1], verdigris[2]);
      space(15);
      doc.text(String(num) + '.', M, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(ink[0], ink[1], ink[2]);
      const lines = doc.splitTextToSize(text, CW - ind);
      for (const line of lines) {
        space(14);
        doc.text(line, M + ind, y);
        y += 14;
      }
      y += 6;
    }

    // --- CRITICAL WARNING BOX ---
    function warningBox(title, body) {
      const boxPad = 12;
      space(100);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      const titleLines = doc.splitTextToSize(title, CW - boxPad * 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      const bodyLines = doc.splitTextToSize(body, CW - boxPad * 2);
      const boxH = titleLines.length * 13 + 6 + bodyLines.length * 14 + boxPad * 2 + 4;
      space(boxH + 8);
      doc.setFillColor(redBg[0], redBg[1], redBg[2]);
      doc.setDrawColor(redDark[0], redDark[1], redDark[2]);
      doc.setLineWidth(1.5);
      doc.roundedRect(M, y, CW, boxH, 4, 4, 'FD');
      let by = y + boxPad;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(redDark[0], redDark[1], redDark[2]);
      for (const line of titleLines) {
        doc.text(line, M + boxPad, by);
        by += 13;
      }
      by += 4;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10.5);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      for (const line of bodyLines) {
        doc.text(line, M + boxPad, by);
        by += 14;
      }
      y += boxH + 16;
    }

    warningBox(
      'CRITICAL WARNING \u2014 READ BEFORE USING',
      'Any seed phrase created with this tool while online must never be used for an actual wallet. The tool can and should be downloaded and run entirely offline (air-gapped) for the purpose of generating seeds that will hold real funds.'
    );

    // --- PART 1: GENERATING THE SEED ---
    heading('Part 1: Generating the Seed with Dice');

    para('The Ian Coleman BIP39 tool is the most widely trusted open-source mnemonic converter in Bitcoin. By supplying your own physical dice rolls as entropy, you can prove to yourself that your seed phrase was generated with true randomness \u2014 not an algorithm you cannot inspect.');

    subheading('Steps');
    numberedItem(1, 'Go to iancoleman.io/bip39 (download the page and run it offline for real seeds).');
    numberedItem(2, 'Scroll down and check the box labeled "Show entropy details".');
    numberedItem(3, 'A new Entropy section will appear on the page.');
    numberedItem(4, 'In the Entropy section:');
    bullet('Change the dropdown (entropy type) from the default to Dice [1-6].', 28);
    bullet('Paste or type your dice roll sequence into the Entropy text box (e.g. 523146261435\u2026).', 28);
    numberedItem(5, 'Select your desired Mnemonic Length (most people choose 24 words).');
    numberedItem(6, 'The tool will automatically convert the dice rolls into a BIP39 seed phrase.');

    subheading('Important Notes');
    bullet('Use only the digits 1\u20136. Spaces between numbers are usually fine but not required.');
    bullet('For a full 24-word seed you typically need 99\u2013100 dice rolls.');
    bullet('If generating a real seed, prefer running the page offline \u2014 save via File \u2192 Save As, or download from the project\u2019s GitHub releases.');
    bullet('Never share the resulting seed phrase or the entropy you entered with anyone.');

    // --- PART 2: WHAT TO DO NEXT ---
    heading('Part 2: After Generating the Seed');

    subheading('1. Record the Critical Information (While Still Offline)');
    para('From the tool, carefully write down (or stamp on metal later):');
    bullet('The 24-word BIP39 Mnemonic (this is your seed phrase \u2014 the most important thing)');
    bullet('Any BIP39 Passphrase you added (the optional \u201C25th word\u201D)');
    bullet('The first 2\u20133 receiving addresses shown for your chosen derivation path (usually m/84\u2019/0\u2019/0\u2019 for Native Segwit)');
    bullet('Optionally: the BIP32 Root Key (xprv) \u2014 but you normally only need the mnemonic');
    para('Do not leave the seed or entropy on the computer longer than necessary. Clear the page / close the browser after recording.');

    subheading('2. Verify the Seed');
    bullet('Confirm the tool shows a valid mnemonic (no error about checksum).');
    bullet('Note the first receiving address. You will check this matches later when you restore the wallet.');
    bullet('Strongly recommended: verify the same seed on a second independent tool or hardware wallet before putting real funds on it.');

    subheading('3. Import into Sparrow Wallet');
    numberedItem(1, 'Open Sparrow Wallet.');
    numberedItem(2, 'Go to File \u2192 New Wallet.');
    numberedItem(3, 'Give the wallet a name and click Create.');
    numberedItem(4, 'On the Settings screen:');
    bullet('Policy Type: Single Signature (default)', 28);
    bullet('Script Type: Native Segwit (P2WPKH) \u2014 the modern recommended choice (addresses start with bc1q\u2026). You can also choose Nested Segwit or Taproot if you have a specific reason.', 28);
    numberedItem(5, 'Under Keystores, click New or Imported Software Wallet.');
    numberedItem(6, 'Select Mnemonic Words (BIP39).');
    numberedItem(7, 'Choose Enter 24 Words.');
    numberedItem(8, 'Carefully type (or paste if on a trusted offline machine) your 24-word seed phrase in the correct order.');
    numberedItem(9, 'If you used a BIP39 passphrase, check the box and enter it carefully (it is case-sensitive).');
    numberedItem(10, 'Click Create Keystore.');
    numberedItem(11, 'Click Import Keystore.');
    numberedItem(12, 'Click Apply.');
    numberedItem(13, 'Set a strong wallet password if prompted (this encrypts the wallet file on your computer \u2014 it is not the same as the BIP39 passphrase).');

    para('Verification: Go to the Receive tab and check that the first address matches the one you noted from the Ian Coleman tool (for the same script type / derivation path). If it matches, the import was successful.');

    subheading('4. Restore on a Hardware Wallet (Recommended for Long-Term Storage)');
    para('Most hardware wallets support BIP39 seed restore:');
    bullet('Coldcard: Use the \u201CImport Existing\u201D / restore seed flow and enter the 24 words (and passphrase if used).');
    bullet('Trezor / Ledger / BitBox / Foundation Passport / Jade / etc.: During setup or recovery, choose \u201CRestore wallet\u201D / \u201CRecover from seed\u201D and enter the words.');
    para('After restoring on the hardware wallet, always verify the first receiving address matches what you recorded from the Ian Coleman tool.');
    para('Best practice: Many people generate the seed offline (as you did), then restore it directly onto a hardware wallet and never put the seed into Sparrow (or any software wallet) if the amounts are significant. Sparrow can still be used later as a watch-only wallet by importing the xpub.');

    subheading('5. Final Security Steps');
    bullet('Transfer the seed to a metal backup (steel plate, Capsule, etc.) and destroy any paper notes.');
    bullet('Test the wallet with a small amount of bitcoin first.');
    bullet('Only after successful receive + send of a small test amount should you move larger funds.');
    bullet('Never enter the seed phrase on an internet-connected device if it will hold meaningful funds.');
    bullet('Consider adding a strong BIP39 passphrase for extra protection (just never lose it).');

    // Security reminder box
    warningBox(
      'SECURITY REMINDER',
      'Generating a seed with your own dice is excellent for verifiable randomness, but the conversion must still be done on a trusted, preferably air-gapped machine. Always verify the resulting words on a second independent tool or hardware wallet before sending funds.'
    );

    // Source
    space(30);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(lead[0], lead[1], lead[2]);
    doc.text('Source: iancoleman.io/bip39 \u2014 open-source, MIT licensed', M, y);
    y += 14;
    doc.text('Bitcoin Guide \u2014 bitcoinguideapp', M, y);

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'Bitcoin-Seed-Dice-and-Restore-Guide.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}