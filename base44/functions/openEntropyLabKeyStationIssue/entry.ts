import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const REPO = 'w-s-bitcoin/entropylab';

const ISSUE_TITLE = 'Feature: Add All / multi-select for adding keys to Key Station after encrypted key upload';

const ISSUE_BODY = `## Summary

In the **Journal** mode, after uploading encrypted keys there is an option to add keys to the **Key Station**, but you have to add them **one by one**. When working with several keys (e.g. a multisig set), this is tedious and error-prone.

## Proposal

Add either (or both) of:

1. **"Add All" button** — a single action that adds every uploaded key to the Key Station in one click.
2. **Multi-select** — checkboxes or shift-click selection on the uploaded key list, then an "Add Selected" action.

## Context

- After importing encrypted keys into the Journal, the user currently taps each key individually to push it into the Key Station.
- For a typical 2-of-3 or 3-of-5 multisig setup, that's 3–5 manual round-trips that could be a single action.
- The underlying data is already available (the keys are parsed and displayed), so this is purely a UX improvement on the add-to-key-station flow.

## Repro

1. Open EntropyLab → Journal mode.
2. Import/upload encrypted keys (e.g. 3 keys for a multisig setup).
3. Observe: each key must be added to the Key Station individually.

## Notes

- No change to the cryptographic or storage path — only the Key Station add flow.
- The built \`entropylab.html\` is generated; this would edit the source module that wires the Journal → Key Station interaction. Rebuild to regenerate the standalone file.
`;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('github');

    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'bitcoin-guide-base44',
      },
      body: JSON.stringify({
        title: ISSUE_TITLE,
        body: ISSUE_BODY,
      }),
    });

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!res.ok) {
      return Response.json({ error: 'GitHub API error', status: res.status, details: data }, { status: 502 });
    }

    return Response.json({ ok: true, issue_url: data.html_url, issue_number: data.number });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}