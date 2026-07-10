import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch the orange cube image
    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/487c529dd_WhatsAppImage2026-07-07at0907286.jpeg');
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

    // Orange cube image centered at top
    const isz = 72;
    doc.addImage(imgUrl, 'JPEG', (PW - isz) / 2, 36, isz, isz);
    y = 36 + isz + 28;

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(ink[0], ink[1], ink[2]);
    const tl = doc.splitTextToSize('Understanding Money: A Simple Guide', CW);
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

    heading('1. The Evolution of Money & Sound Money Principles');
    para('Money evolved through practical innovations that solved problems of trade, storage, and value transfer. Early examples include the Rai stones of Yap, where value came from history and the difficulty of acquisition rather than physical size. Cowrie shells served as one of the earliest widespread currencies across Africa, Asia, and the Pacific due to their durability, portability, and distinct appearance. Coinage, introduced around 600 BCE in Lydia, brought standardization through durable metal pieces whose weight and purity guaranteed value. Silver and gold systems later tied currency to scarce physical resources, creating stability because supply was constrained by reality rather than decree.');
    para('These systems worked because money had real costs and limits - acquiring or producing it required meaningful effort or scarce resources. This created natural discipline against debasement. Fiat money broke this connection by allowing unlimited creation based on trust and government authority alone. The following sections explore each stage in greater depth, revealing why sound money - money that reliably holds value over time - has been so rare and so prized throughout human history.');

    heading('2. Rai Stones: The Stone Money of Yap');
    para('Rai stones, or stone money, are large, circular limestone discs used as currency on Yap Island in Micronesia for hundreds of years. Ranging from a few inches to over three meters in diameter, these heavy artifacts were quarried from distant islands - primarily Palau, roughly 400 kilometers away - and transported by canoe across open ocean. Their value, however, was never based primarily on physical size or weight. Instead, it derived from the documented history of risk, labor, and sometimes loss of life involved in their creation and journey.');
    para('A famous example involves a large stone that sank to the ocean floor during transport; its "owner" and community still recognized its full value because the story of its acquisition was collectively remembered and trusted. Ownership itself was often symbolic and public - recorded in oral tradition rather than requiring physical possession. Rai stones were used for major life events: dowries, land transfers, political alliances, fines for serious offenses, and ceremonial exchanges. They represented wealth that was both portable in concept and deeply rooted in social consensus.');
    para('With the arrival of colonial powers and modern currencies in the 19th and 20th centuries, practical use of Rai stones declined, though they remain culturally significant on Yap today.');

    heading('3. Seashell Money: The Cowries');
    para('Cowrie shells - especially the small, glossy Monetaria moneta species - represent one of the most successful and geographically widespread commodity moneys in human history. Sourced mainly from the shallow reefs of the Maldives in the Indian Ocean, these shells were collected, cleaned, and traded across vast networks reaching China, India, Southeast Asia, the Middle East, and deep into Africa. Their appeal as money was practical and hard to replicate: they were naturally uniform, extremely durable (resisting rot, fire, and wear), lightweight for their value, instantly recognizable, and difficult to counterfeit convincingly.');
    para('Like all commodity moneys, cowries were subject to supply shocks. When European demand drove intensified harvesting or when new sources were exploited, inflation followed. Yet for hundreds of years, the cowrie\'s natural properties - portability, durability, and resistance to forgery - made it a superior solution to the problems of barter across diverse cultures. Its long success underscores humanity\'s early experimentation with standardized, trust-minimized exchange media.');

    heading('4. Coinage: The Evolution of Money');
    para('Around 600 BCE in the kingdom of Lydia (western Anatolia, modern Turkey), the world\'s first coins emerged under King Alyattes and his son Croesus. These were small, bean-shaped pieces of electrum - a naturally occurring gold-silver alloy - stamped with official symbols such as the lion\'s head. By combining a standardized weight and guaranteed purity with the issuing authority\'s mark, Lydian coins solved a fundamental problem: merchants no longer needed to weigh and assay metal for every transaction. This innovation slashed transaction costs and dramatically expanded the scale of trade.');
    para('The concept spread rapidly. Greek city-states issued beautiful silver coins (notably Athens\' famous "owl" tetradrachms), while the Persian Empire, Hellenistic kingdoms, and eventually Rome developed sophisticated gold and silver coinages. Roman aurei and denarii carried portraits of emperors and gods, functioning simultaneously as money, propaganda, and portable art. China independently developed round bronze coins with square central holes by the 4th century BCE, designed for stringing into convenient units.');
    para('Coins introduced the powerful idea of state-enforced standardization. They enabled efficient taxation, standing armies, large-scale public works, and complex credit systems. Yet they also created new vulnerabilities: rulers facing fiscal pressure often debased coins by reducing precious-metal content while maintaining face value - a hidden tax that eroded public trust over time. Despite these risks, coinage established the template for monetary systems that would dominate for the next 2,500 years.');

    heading('5. Silver and Gold Money Systems');
    para('For much of recorded history, silver and gold served as the backbone of monetary systems across civilizations. These precious metals possessed the qualities that made them ideal money: scarcity, durability, divisibility, portability, and universal desirability. Nations minted coins and later backed paper currency with physical reserves of gold and silver, tying the money supply to scarce physical resources. Because supply was constrained by the difficulty and cost of mining rather than by decree, these systems created monetary stability that fostered long-term trade and savings.');
    para('These systems delivered remarkable long-term price stability and international monetary order. Because new money could only enter circulation through mining or maintaining adequate reserves, governments faced hard limits on spending and credit creation. However, the very rigidity that provided discipline also created problems. Gold supply grew slowly and unpredictably; when economies expanded faster than the monetary base, deflationary pressure could emerge. Major silver discoveries (such as Potosi in the 16th century) caused significant inflation across Europe - the famous Price Revolution. Bimetallic systems suffered from Gresham\'s Law, where overvalued metal drove undervalued metal out of circulation.');
    para('World wars, economic crises, and the desire for more active monetary management led governments to abandon strict convertibility. The Bretton Woods system (1944-1971) attempted a diluted gold standard with the U.S. dollar as the central reserve currency, but persistent deficits and inflation ultimately forced President Nixon to close the gold window in 1971. The age of pure fiat money - currency backed only by government decree and public confidence - had fully arrived.');

    heading('6. Fiat Money: Trust-Based Currency');
    para('Fiat money is currency that derives its value not from any intrinsic worth or backing by physical commodities, but from government decree and public trust. Central banks can create it in unlimited quantities by adjusting reserve requirements, setting interest rates, or through quantitative easing. This flexibility allows governments to respond to crises, fund public spending, and manage economic cycles - but it comes at a cost.');
    para('In practice, the removal of physical constraints on money creation has produced consistent, if often gradual, loss of purchasing power across virtually all fiat currencies. Moderate inflation (commonly targeted at 2% annually) compounds over decades into substantial erosion of savings. Hyperinflations - Weimar Germany, Zimbabwe, Venezuela - demonstrate what happens when public trust collapses. Even in stable economies, the Cantillon effect operates: newly created money enters the economy at specific points (central banks, commercial banks, government contractors), benefiting early recipients before prices rise and harming later recipients and cash holders.');
    para('Fiat systems excel at short-term policy flexibility but systematically undermine money\'s function as a long-term store of value. They sever the ancient connection between the creation of money and any real-world cost or scarcity. The result is a hidden tax on labor and savings that transfers wealth from the many to the politically connected few. Understanding this dynamic is essential for anyone seeking to preserve the value of their time and effort across generations.');

    heading('7. Bitcoin: Digital Decentralized Money');
    para('Bitcoin, launched in 2009 by the pseudonymous Satoshi Nakamoto, is the first widely adopted decentralized digital currency. It solves the fundamental problem of digital money - preventing double-spending without a trusted central party - through a combination of cryptographic signatures, a distributed public ledger (the blockchain), and economic incentives secured by proof-of-work. Participants worldwide run software that enforces a strict, transparent set of rules, the most important being a hard cap of 21 million bitcoins that can ever exist.');
    para('New bitcoins are issued according to a predetermined schedule that halves roughly every four years, with the final coins projected to be mined around 2140. This creates genuine, verifiable digital scarcity enforced not by law or company policy but by mathematics and the economic self-interest of thousands of independent nodes. As of mid-2026, over 19.7 million bitcoins have been mined, and the annual issuance rate has fallen below 1% and continues declining.');
    para('Bitcoin revives the core properties of sound money in digital form:');
    bullet('Scarcity', 'The supply schedule is fixed and predictable; inflating it requires an attacker to control the majority of global computational power securing the network, an extraordinarily expensive undertaking.');
    bullet('Durability', 'Digital information does not degrade or rust; properly secured, Bitcoin can last indefinitely.');
    bullet('Portability', 'High value can be transferred across borders in minutes (or seconds via the Lightning Network) at minimal cost, without physical movement or customs.');
    bullet('Divisibility', 'One bitcoin divides into 100 million satoshis, enabling micro-transactions.');
    bullet('Verifiability', 'Anyone can independently audit the entire money supply and transaction history by running a node; no trusted auditor required.');
    bullet('Decentralization', 'No single entity can unilaterally change the rules, freeze funds, or censor transactions without overwhelming consensus.');
    para('Often described as "digital gold," Bitcoin improves upon physical gold\'s monetary properties in nearly every dimension while restoring the discipline that fiat money abandoned. It represents the culmination of money\'s evolution: a form of money that combines the scarcity of gold, the portability of digital information, and the trust-minimization of commodity money - all without reliance on any government, corporation, or central authority.');

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
    const file = new File([pdfBytes], 'Understanding_Money.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});