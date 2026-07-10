import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch the Gresham's Law cube image
    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/6eb977e97_WhatsAppImage2026-07-07at090709.jpeg');
    const imgBuf = await imgResp.arrayBuffer();
    const imgB64 = btoa(String.fromCharCode(...new Uint8Array(imgBuf)));
    const imgUrl = `data:image/jpeg;base64,${imgB64}`;

    // Site color theme
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

    // Cube image centered at top
    const isz = 72;
    doc.addImage(imgUrl, 'JPEG', (PW - isz) / 2, 36, isz, isz);
    y = 36 + isz + 28;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize("Gresham's Law: Bad Money Drives Out Good", CW);
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

    // --- CLEANED CONTENT ---

    heading('The Principle');
    para("Gresham's Law is an economic principle stating that 'bad money drives out good' when both forms are circulating as legal tender at a fixed exchange rate. The observation is simple but profound: when two forms of money are legally required to be accepted at the same value, people will spend the inferior form and hoard the superior one. Over time, the good money disappears from circulation entirely.");
    para('The law is named after Sir Thomas Gresham, a 16th-century English financier and founder of the Royal Exchange, though the principle was noted as early as the 14th century by Nicole Oresme and appears even in the works of Aristophanes. Gresham advised Queen Elizabeth I during a period when her father, Henry VIII, had notoriously debased English coinage by reducing the silver content while maintaining face value. The debased coins drove the older, purer coins out of circulation — exactly as the law predicts.');
    para('Understanding what "good" and "bad" money mean is essential:');
    bullet('Good Money', 'Currency with higher inherent value — historically, coins made of precious metals like gold or silver whose metal content matched their face value. Good money holds its purchasing power independently of any government decree.');
    bullet('Bad Money', 'Currency with less inherent value — debased coins with reduced precious metal content, or paper money printed in excess supply. Bad money is worth less than its face value in material terms, but laws force acceptance at par.');
    para("The critical condition is the fixed exchange rate. When the law mandates that bad money and good money must be accepted as equal, rational actors always spend the bad and keep the good. It is not that people prefer bad money — they prefer to keep what is valuable and pass along what is not.");

    heading("1. Historical Examples of Gresham's Law");
    para("History is rich with examples of Gresham's Law operating exactly as described:");
    bullet('Henry VIII and the Great Debasement', "Between 1542 and 1551, Henry VIII progressively reduced the silver content of English coins from 92.5% to just 25%, while maintaining face value. Citizens immediately hoarded the older, purer coins and spent the new debased ones. The good coins vanished from circulation within years, and England experienced severe inflation as the money supply of debased coin expanded.");
    bullet('Colonial America', 'In the American colonies, Spanish silver dollars (pieces of eight) were widely accepted as good money, while colonial paper currency issued in excess served as bad money. Colonists hoarded the Spanish silver and spent the paper, which rapidly lost value. The phrase "not worth a continental" referred to Continental currency that had been inflated to worthlessness.');
    bullet('Bimetallism in the United States', "In the late 19th century, the U.S. operated on a bimetallic standard with both gold and silver coins. When the market ratio of gold to silver diverged from the legally mandated ratio, the undervalued metal was hoarded and the overvalued metal circulated. This dynamic caused repeated monetary crises until gold effectively became the sole standard.");
    para("In every case, the pattern repeats: when the law forces equality between unequal monies, the superior form disappears. The mechanism is not coercion or deception — it is simple rationality. No one willingly gives away something more valuable when they can give something less valuable instead.");

    heading('2. Fiat Money: The Universal Bad Money');
    para("In the modern world, Gresham's Law operates on a scale Gresham could never have imagined. All major currencies are now fiat — money backed by nothing but government decree and public confidence. Since the closing of the gold window in 1971, there has been no constraint on the creation of new money. Central banks can and do expand the money supply at will, diluting the purchasing power of every unit already in existence.");
    para('Fiat currency is the ultimate bad money — not because it is worthless in the moment, but because its supply can be expanded without limit. Every dollar, euro, or peso in your pocket represents a claim that can be diluted at any time by the creation of new units. This is not a hypothetical concern: the U.S. dollar has lost approximately 97% of its purchasing power since the Federal Reserve was established in 1913. Every fiat currency in history has eventually reached its intrinsic value: zero.');
    para("Yet within any single country, fiat money is the only money. There is no competing good money legally circulating at a fixed rate — so in one sense, Gresham's Law appears dormant. People must spend their fiat because they have no alternative. But this apparent dormancy is an illusion created by legal tender laws and capital controls that prevent competition. The moment a genuinely superior money enters the system without being fixed to fiat at an artificial rate, Gresham's Law awakens.");

    heading('3. Bitcoin: The Return of Good Money');
    para('Bitcoin is the first form of good money to emerge in the fiat era. Its properties stand in stark contrast to every fiat currency:');
    bullet('Fixed Supply', 'Only 21 million bitcoins will ever exist. This supply is enforced by mathematics and the consensus of thousands of independent nodes — not by any promise, law, or institution that could be changed.');
    bullet('Censorship Resistance', 'No government, corporation, or individual can freeze a Bitcoin address, block a transaction, or reverse a payment. Bitcoin is the first money in history that truly belongs to its holder.');
    bullet('Verifiable Scarcity', "Unlike gold, whose supply can increase if mining becomes more efficient, Bitcoin's supply schedule is publicly auditable and immutable. Anyone can verify exactly how many bitcoins exist at any moment.");
    bullet('Portability', 'Unlike physical gold or real estate, Bitcoin can be moved across borders in minutes, stored entirely in memory, and transferred for negligible fees.');
    para('Bitcoin is not merely a better fiat — it is a return to the monetary properties that defined good money throughout history: scarcity that cannot be inflated away, and value that does not depend on the promises of any authority. For the first time in over a century, there is a form of money that is genuinely good circulating alongside the bad.');

    heading("4. Gresham's Law in the Bitcoin Era");
    para("When Bitcoin and fiat currencies coexist, Gresham's Law operates with full force — but with a critical difference. Bitcoin is not legally fixed to fiat at any exchange rate. It floats freely, and its price is determined entirely by market demand. This means the law operates in a modified form:");
    bullet('People spend fiat and hoard Bitcoin', "Because fiat loses purchasing power through inflation while Bitcoin's supply is fixed, rational actors prefer to hold Bitcoin and spend fiat. This is Gresham's Law in its purest form — bad money is spent, good money is saved.");
    bullet('The good money appreciates', "Unlike historical examples where good money simply disappeared from circulation, Bitcoin's floating price means it is visible and growing in value. As more people recognize Bitcoin as superior money, demand increases and price rises — making the hoarding behavior even more rewarding.");
    bullet('Fiat adoption accelerates decline', "Every time someone converts fiat to Bitcoin, they remove fiat from their own balance sheet and add to Bitcoin's network. Over time, this compounds — fiat loses users and Bitcoin gains them, a one-way ratchet that Gresham's Law makes nearly impossible to reverse.");
    para("This is why Bitcoiners say 'spend fiat, stack sats.' It is not a slogan — it is Gresham's Law expressed as personal financial strategy. In a world where good money and bad money coexist, rational actors hoard the good and spend the bad. The result is a slow but accelerating drain of value from fiat into Bitcoin, exactly as the law predicts.");

    heading("5. The Thiers' Law Inversion");
    para("Interestingly, a complementary principle known as Thiers' Law suggests the opposite of Gresham's Law: in the absence of fixed exchange rates, good money tends to drive out bad. When people are free to choose their money, they naturally prefer the superior form. This is why people in countries with unstable currencies — Argentina, Venezuela, Turkey, Lebanon — increasingly choose to save in dollars or Bitcoin rather than their local fiat.");
    para("Gresham's Law and Thiers' Law are not contradictory — they describe different conditions. Gresham's Law applies when exchange rates are fixed by law, forcing acceptance of bad money at par. Thiers' Law applies when exchange rates float freely, allowing people to choose. The distinction matters enormously for Bitcoin:");
    bullet('Under Gresham\'s Law (fixed rate)', "People spend fiat and hoard Bitcoin. Bitcoin's velocity as a medium of exchange remains low because no one wants to part with it.");
    bullet("Under Thiers' Law (floating rate)", 'As fiat currencies fail and people are free to choose, good money (Bitcoin) begins to replace bad money (failing fiat) in everyday transactions. This is already happening in hyperinflationary economies.');
    para("The transition between these two phases is what Bitcoiners describe as 'gradually, then suddenly.' Initially, Gresham's Law dominates — people hoard Bitcoin and spend fiat. But as fiat currencies weaken and merchant adoption grows, a tipping point arrives where it becomes more natural to transact in Bitcoin directly. At that point, Thiers' Law takes over, and good money actively drives out bad.");

    heading('6. Implications for the Global Economy');
    para("Gresham's Law, applied to the Bitcoin-fiat dynamic, has profound implications:");
    bullet('Pressure on Fiat Systems', "As more individuals and institutions recognize Bitcoin as superior money, capital flows out of fiat and into Bitcoin. This puts structural upward pressure on Bitcoin's price and downward pressure on fiat currencies — a dynamic already visible in the decoupling of hard assets from traditional currencies.");
    bullet('Sovereign Debt Crisis', "Governments depend on the ability to create money to service debt. As Gresham's Law drains value from fiat, the cost of servicing sovereign debt rises, accelerating the very debasement that drives people toward Bitcoin. This creates a feedback loop with no exit for governments that refuse to adopt fiscal discipline.");
    bullet('Emergence of Bitcoin Economies', "In regions with unstable fiat currencies, Bitcoin adoption is growing rapidly because the local bad money has already failed. In these economies, Gresham's Law has already transitioned to Thiers' Law — people use Bitcoin not just as a store of value but as a medium of exchange, bypassing the failing fiat system entirely.");
    bullet('The Inevitable Transition', "Gresham's Law tells us that bad money is spent and good money is saved — but it also tells us that good money never truly disappears. It is hoarded, waiting for the moment when bad money fails and good money returns to circulation. Bitcoin is that returning good money, and the process is accelerating worldwide.");

    heading('Conclusion');
    para("Gresham's Law is one of the oldest and most reliable observations in economics. It has operated across centuries, continents, and civilizations. The principle is simple: when two forms of money coexist at a fixed rate, people hoard the good and spend the bad. The law does not require conspiracy, coercion, or even understanding — it follows inevitably from rational self-interest.");
    para("In the Bitcoin era, Gresham's Law operates with unprecedented clarity. Fiat currency is the universal bad money — infinitely dilutable, fundamentally depreciating, and increasingly distrusted. Bitcoin is the first genuine good money in over a century — scarce, portable, verifiable, and beyond the reach of any authority. The law predicts exactly what we observe: people are hoarding Bitcoin and spending fiat. The good money is being saved. The bad money is being circulated until it is worthless.");
    para("The ultimate implication of Gresham's Law is hopeful: good money does not disappear forever. It waits — hoarded by those who recognize its value — until the bad money collapses under its own weight. At that point, the good money returns to circulation, and the cycle begins anew. Bitcoin represents not just a new form of money, but the return of monetary sanity after a century of systematic debasement. The law that predicted the disappearance of good money now predicts its return.");

    // Page numbers
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(lead[0], lead[1], lead[2]);
      doc.text(String(i), PW / 2, PH - 20, { align: 'center' });
    }

    // Upload PDF
    const pdfBytes = doc.output('arraybuffer');
    const file = new File([pdfBytes], 'GreshamsLaw.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});