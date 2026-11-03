import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

const REPO = 'w-s-bitcoin/entropylab';

const ISSUE_TITLE = 'Beta warning modal, banners, and section headers not translated when language is switched';

const ISSUE_BODY = `## Summary

The site now offers language options (Spanish, etc.), but several warning and header strings remain in English when the UI language is switched. The body content localizes correctly, but the warning/modal headers do not.

## Steps to reproduce

1. Open entropylab.online
2. Dismiss the beta modal
3. Switch the language selector to Spanish (ES)
4. Observe the top banners and section headers

## Expected

All UI strings localize, including:

- Beta modal: title "BETA SOFTWARE", body text, "I UNDERSTAND" button
- Top banners: "BETA SOFTWARE", "OFFLINE VERSION" / "ONLINE VERSION" headers + body
- Section headers (e.g. "RUN OFFLINE · BRING YOUR OWN ENTROPY", "Create. Derive. Verify.")

## Actual

Body content localizes to Spanish, but the warning headers stay in English. Confirmed on mobile Safari (ES selected):

- Banner header reads **"ONLINE VERSION"** while the body beneath it is fully Spanish
- "RUN OFFLINE · BRING YOUR OWN ENTROPY" remains English
- Beta modal title ("BETA SOFTWARE") and button ("I UNDERSTAND") remain English

## Why it matters

The warning banners are safety-critical — they tell users not to enter secrets on an online device. A Spanish-speaking user who sees an English header may skim past it assuming the body is also English, or miss the warning entirely if they only scan headings. Headers are the first thing read; leaving them untranslated undermines the warning's purpose.

## Notes

- Looks like the warning/modal/header strings bypass the i18n layer that the body copy goes through.
- Screenshot available on request (mobile Safari, ES selected, "ONLINE VERSION" header above a Spanish body).
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