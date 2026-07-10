import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { jsPDF } from 'npm:jspdf@4.0.0';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch the Low Time Preference cube image
    const imgResp = await fetch('https://media.base44.com/images/public/6a4d10bcc776843a6d26b955/bd2d0816a_WhatsAppImage2026-07-07at0907273.jpeg');
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
    const tl = doc.splitTextToSize('Low Time Preference: The Foundation of Civilization', CW);
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

    // --- CLEANED CONTENT ---

    heading('Understanding Time Preference');
    para('Time preference is one of the most fundamental concepts in economics and human behavior. It describes the degree to which an individual values present satisfaction over future satisfaction. Every person has a time preference: the question is not whether they prefer the present, but how strongly. A person with high time preference prioritizes immediate gratification — spending today rather than saving for tomorrow. A person with low time preference is willing to delay consumption, save, and invest for greater rewards in the future.');
    para('This concept, developed extensively by the Austrian School of economics, is not merely an academic abstraction. It is the single most important variable determining whether an individual builds wealth or remains poor, and whether a civilization advances or declines. The capacity to delay gratification — to choose the harder path today for an easier tomorrow — underlies every great achievement in human history, from the construction of cathedrals to the funding of scientific research to the raising of children.');
    para('The Austrian economist Ludwig von Mises placed time preference at the center of his economic framework in Human Action. Saifedean Ammous extended this analysis in The Bitcoin Standard, arguing that the choice of money fundamentally shapes the time preference of an entire society. Their insights reveal that money is not neutral — the form of money a society uses determines whether its people think in years or in minutes.');

    heading('The Austrian Economics Framework');
    para('In Austrian economic theory, time preference is the originating cause of interest rates. People naturally prefer present goods over future goods — a bird in the hand is worth two in the bush. The degree of this preference determines the interest rate: how much more a person values a good today than the same good a year from now. When people have low time preference, they are willing to save more, which lowers interest rates and makes long-term investment more feasible. This creates a virtuous cycle: savings fund investment, investment builds capital, capital increases productivity, and increased productivity raises living standards.');
    para('The opposite dynamic is equally powerful. When a society has high time preference, people save less, interest rates are higher (or artificially suppressed by central banks), investment declines, capital is consumed rather than accumulated, and living standards stagnate or fall. Mises described the relationship clearly:');
    quote("The lowering of the time preference is the driving force of all economic progress. It is the foundation of savings and investment, which are prerequisites for capital accumulation and the improvement of material conditions.", 'Ludwig von Mises, Human Action');
    para('Ammous built on this foundation, connecting time preference directly to the quality of money:');
    quote("Low time preference is the key to advancing civilization; it allows individuals to accumulate capital and invest in projects that take years, decades, or even centuries to bear fruit.", 'Saifedean Ammous, The Bitcoin Standard');
    para("These perspectives underline the critical role time preference plays in building enduring wealth and fostering societal growth. Sound money — money that cannot be inflated or debased — rewards those who save and plan. Unsound money — money that loses value constantly — punishes them and forces everyone into a high-time-preference mindset.");

    heading('1. High Time Preference: The Fiat Condition');
    para('Fiat money systematically raises the time preference of everyone forced to use it. When the currency loses purchasing power every year through inflation, saving becomes irrational. Why defer consumption if the money you save will buy less tomorrow than it does today? The rational response to a depreciating currency is to spend now, borrow now, and consume now — the exact behaviors that destroy wealth over time.');
    para('This dynamic is not accidental. Central banks explicitly target inflation — typically 2% per year — as a matter of policy. This means that cash saved under a mattress loses half its value in roughly 35 years. Money in a bank account earning minimal interest loses value in real terms. Even invested savings often barely outpace inflation after taxes. The entire incentive structure of fiat money pushes individuals toward:');
    bullet('Consumerism', 'If money loses value, spending it on goods that retain utility is more rational than holding it. Advertising and consumer culture exploit this, but the root cause is monetary.');
    bullet('Debt', 'Borrowing today to pay back with depreciated dollars tomorrow is advantageous under inflation. This incentivizes personal, corporate, and government debt — the fiat economy runs on credit.');
    bullet('Speculation', 'With savings eroded, people seek higher-risk assets to outpace inflation. This fuels boom-bust cycles, asset bubbles, and casino-like behavior in financial markets.');
    bullet('Short-Termism', 'Corporations optimize for quarterly earnings rather than long-term value. Politicians optimize for the next election cycle rather than generational sustainability. Entire institutions lose the capacity to think beyond the short term.');
    para('The result is a society where everyone is running faster just to stay in place. Productivity gains that should reduce the cost of living are offset by monetary expansion. Wages rise in nominal terms but fall in purchasing power. The young increasingly cannot afford what their parents took for granted — not because of a lack of technology or resources, but because the money itself is failing them.');

    heading('2. Low Time Preference: The Civilizational Engine');
    para('Low time preference is the engine of civilization. When individuals can trust that their savings will hold value over decades, they make fundamentally different decisions. They invest in education, in infrastructure, in research, in businesses that may take years to become profitable. They build for future generations rather than consuming for the present moment.');
    para('The historical record is clear. The civilizations that achieved the greatest advances — the Italian Renaissance, the Dutch Golden Age, the Industrial Revolution — did so under monetary systems that rewarded saving and long-term thinking. Gold and silver standards, for all their imperfections, provided a stable store of value that allowed people to plan across generations. When money holds its value, time itself becomes an ally rather than an enemy.');
    bullet('Long-Term Planning', 'Thoughtful allocation of resources for future use. Projects that take decades — cathedrals, universities, research programs — become feasible only when money holds its value.');
    bullet('Saving and Capital Accumulation', 'The foundation of economic growth. Savings are not hoarding — they are deferred consumption that funds the capital investment making everyone more productive.');
    bullet('Investment in Human Capital', 'Education, apprenticeship, and skill development require years of investment before yielding returns. Low time preference makes this investment rational.');
    bullet('Multi-Generational Thinking', 'The ability to build wealth and pass it to future generations. Sound money makes inheritance meaningful; unsound money makes it nearly impossible.');
    para('Ammous argues persuasively that the artistic and intellectual flourishing of the 19th century — the age of the gold standard — was not coincidental. When money is sound, the brightest minds turn toward productive work, artistic creation, and scientific advancement. When money is unsound, those same minds are diverted toward financial engineering, speculation, and rent-seeking. The form of money shapes the allocation of human talent itself.');

    heading('3. Bitcoin as Low-Time-Preference Money');
    para('Bitcoin is the first money in history engineered to have a strictly fixed supply. Only 21 million bitcoins will ever exist, and the issuance schedule is predetermined and unchangeable. This makes Bitcoin fundamentally deflationary in real terms — as the economy grows and adoption increases, each bitcoin represents a claim on a larger share of global wealth. Saving in Bitcoin is rewarded rather than punished.');
    para('This property transforms the time preference of those who adopt it. When your savings appreciate rather than depreciate, the rational choice shifts from immediate consumption to patient accumulation. Bitcoiners describe this experience as a profound psychological shift — the realization that time is on your side for the first time, that patience is rewarded rather than exploited.');
    para('Bitcoin cultivates low time preference through several mechanisms:');
    bullet('Store of Value', 'Bitcoins fixed supply means it cannot be inflated away. Savings held in Bitcoin retain and grow in purchasing power over time, making deferred consumption rational.');
    bullet('Permissionless Saving', 'No bank can freeze your account, no government can seize your holdings, no central bank can dilute your savings. Bitcoin gives individuals true ownership of their stored time and energy.');
    bullet('Long Time Horizons', 'Because Bitcoin is designed to exist for centuries, holding it encourages thinking in multi-year and multi-decade timeframes. The four-year halving cycle creates natural rhythms of accumulation and patience.');
    bullet('Alignment with Civilization', 'By adopting sound money, Bitcoiners align their personal incentives with the long-term flourishing of civilization. Saving in Bitcoin is an act of civilizational optimism.');
    para("For many, adopting Bitcoin has been transformative. As one observer noted: 'This realization radically transformed my perspective in my late 50s — so what are you waiting for?' The shift from a fiat mindset to a Bitcoin mindset is not merely a change in investment strategy. It is a fundamental reorientation of one's relationship with time, value, and the future.");

    heading('4. The Contrast: Fiat vs. Bitcoin Time Preference');
    para('The difference between fiat and Bitcoin can be understood as a difference in time preference imposed by the monetary system itself. Consider how the same individual behaves under each system:');
    bullet('Under Fiat', 'You are punished for saving. Your money loses value. You are pushed toward consumption, debt, and speculation. You think in days and weeks because the money itself is unstable over longer periods. You cannot plan for retirement with confidence because the purchasing power of your savings is unknowable decades ahead.');
    bullet('Under Bitcoin', 'You are rewarded for saving. Your money gains value. You are free to consume, save, and invest according to your own values rather than the central bank. You think in years and decades because the money is stable and predictable. You can plan for retirement, for your children, and for causes you believe in with mathematical certainty.');
    para('This is not a theoretical distinction. It is the lived experience of millions of people who have adopted Bitcoin as their savings vehicle. The psychological shift from anxiety about the future to confidence in it is the most commonly reported effect of Bitcoin adoption. When money holds its value, the future becomes something to invest in rather than something to fear.');

    heading('5. Societal Implications');
    para('If time preference is the central variable in civilizational progress, then the monetary system that shapes time preference is the most important social institution. A society on a high-time-preference money (fiat) will exhibit different characteristics than a society on a low-time-preference money (Bitcoin):');
    bullet('Economic Stability', 'Low-time-preference societies save more, invest more, and experience fewer destructive boom-bust cycles. The Austrian theory of the business cycle explains how credit expansion driven by central banks creates artificial booms followed by painful busts — a cycle absent under sound money.');
    bullet('Innovation and Research', 'When people can think in decades, they invest in projects with long payback periods: fundamental scientific research, infrastructure, space exploration, and basic technology. High-time-preference societies optimize for immediate returns and underinvest in the foundations of future progress.');
    bullet('Family and Community', 'Low time preference encourages investment in children, community, and culture — things that pay returns across generations. High time preference erodes these bonds as everyone focuses on immediate survival and gratification.');
    bullet('Environmental Stewardship', 'The common critique that Bitcoin harms the environment is inverted by the time-preference lens. Sound money encourages long-term thinking, which is the prerequisite for genuine environmental stewardship. Fiat systems, driven by short-term growth imperatives, systematically degrade natural capital for present consumption.');
    para('The transition from fiat to Bitcoin is, at its deepest level, a transition from a high-time-preference civilization to a low-time-preference one. This is why Bitcoin matters beyond its function as money. It is a technology for restoring the civilizational conditions that produced the greatest advances in human history.');

    heading('Conclusion');
    para('Low time preference is not merely an economic strategy — it is a philosophy for creating a better world. The capacity to delay gratification, to save rather than consume, to invest in projects that take years or decades to bear fruit — this is the foundation of all material and cultural progress. Every great civilization has been built by people who could think beyond the present moment.');
    para('Fiat money destroys this capacity by making saving irrational and consumption compulsory. It is a monetary system engineered for short-termism, and the results are visible everywhere: debt-saturated economies, crumbling infrastructure, declining birth rates, and a pervasive sense that the future is something to be feared rather than built.');
    para('Bitcoin restores the foundation of low time preference by providing money that holds its value over time. It realigns incentives toward saving, investment, and long-term thinking. It allows individuals to plan for the future with confidence and to build wealth that can be passed to future generations. By aligning individual incentives with civilizational flourishing, Bitcoin offers a path out of the short-term trap of fiat money.');
    para('The question is not whether this transition will happen — it is already happening, one individual at a time. The question is whether you will recognize it in time to benefit from it. As the observer quoted earlier asked: what are you waiting for? The shift to low time preference begins with a single decision: to save in money that cannot be debased, to think in timeframes that extend beyond the next news cycle, and to build for a future you may not live to see but can help create. That is the Bitcoin standard. That is the foundation of civilization.');

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
    const file = new File([pdfBytes], 'LowTimePreference.pdf', { type: 'application/pdf' });
    const result = await base44.asServiceRole.integrations.Core.UploadFile({ file });

    return Response.json({ file_url: result.file_url, pages: totalPages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});