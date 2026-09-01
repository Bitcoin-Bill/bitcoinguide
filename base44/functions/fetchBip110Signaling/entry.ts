import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const list = await base44.asServiceRole.entities.Bip110Status.list('-updated_date', 1);
    const latest = list && list[0];
    if (!latest) {
      return Response.json({ ok: false, empty: true });
    }
    return Response.json({
      ok: true,
      signalRate: latest.signalRate,
      signalingBlocks: latest.signalingBlocks,
      periodBlocks: latest.periodBlocks,
      blocksLeft: latest.blocksLeft,
      daysLeft: latest.daysLeft,
      periodProgress: latest.periodProgress,
      signalsNeeded: latest.signalsNeeded,
      summary: latest.summary,
      sourceUrl: latest.sourceUrl,
      updatedDate: latest.updated_date,
      lockInThreshold: 1109,
      lockInPeriodBlocks: 2016,
      thresholdPct: 55,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}