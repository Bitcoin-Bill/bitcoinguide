import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    const llm = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt:
        "Look up the current live BIP-110 (also called RDTS) Bitcoin soft fork miner signaling status. " +
        "Primary source: https://bip110.org/monitor (live signaling counter). Also cross-check wickedsmartbitcoin.com/bip110_signaling and BGeometrics api.bitcoin-data.com. " +
        "Return the current values for the ongoing 2016-block difficulty period: " +
        "signalRate (% of blocks signaling so far this period), signalingBlocks (blocks signaling this period), " +
        "periodBlocks (total blocks mined so far this period), blocksLeft (blocks remaining in the period), " +
        "daysLeft (approx days remaining), periodProgress (% of the period elapsed), " +
        "signalsNeeded (more signals required to reach the 1109/2016 lock-in threshold). " +
        "Also write a one-sentence summary of what BIP-110 is and its current activation status. " +
        "Use the most recent data available on the web right now.",
      add_context_from_internet: true,
      model: 'gemini_3_flash',
      response_json_schema: {
        type: 'object',
        properties: {
          signalRate: { type: 'number' },
          signalingBlocks: { type: 'number' },
          periodBlocks: { type: 'number' },
          blocksLeft: { type: 'number' },
          daysLeft: { type: 'number' },
          periodProgress: { type: 'number' },
          signalsNeeded: { type: 'number' },
          summary: { type: 'string' },
        },
      },
    });

    const d = llm || {};
    const payload = {
      signalRate: Number(d.signalRate) || 0,
      signalingBlocks: Number(d.signalingBlocks) || 0,
      periodBlocks: Number(d.periodBlocks) || 0,
      blocksLeft: Number(d.blocksLeft) || 0,
      daysLeft: Number(d.daysLeft) || 0,
      periodProgress: Number(d.periodProgress) || 0,
      signalsNeeded: Number(d.signalsNeeded) || 0,
      summary: d.summary || '',
      sourceUrl: 'https://bip110.org/monitor',
    };

    const existing = await base44.asServiceRole.entities.Bip110Status.list();
    if (existing && existing.length > 0) {
      await base44.asServiceRole.entities.Bip110Status.update(existing[0].id, payload);
    } else {
      await base44.asServiceRole.entities.Bip110Status.create(payload);
    }

    return Response.json({ ok: true, ...payload });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}