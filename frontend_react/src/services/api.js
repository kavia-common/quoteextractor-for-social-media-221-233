//
// API client for Quote Extractor backend
//

const DEFAULT_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

function assertOk(res) {
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res;
}

// PUBLIC_INTERFACE
export async function healthCheck() {
  /** Check backend health endpoint. */
  const res = await fetch(`${DEFAULT_BACKEND_URL}/`);
  await assertOk(res);
  return res.json();
}

// PUBLIC_INTERFACE
export async function extractQuotes({ file, transcript, options }) {
  /**
   * Extract quotes by posting multipart/form-data to /extract.
   * file: File | null
   * transcript: string | null
   * options: { top_k?, min_length?, max_length?, include_timestamps? }
   */
  const form = new FormData();
  if (file) form.append('file', file);
  if (transcript) form.append('transcript', transcript);
  if (options && typeof options.top_k === 'number') form.append('top_k', String(options.top_k));
  if (options && typeof options.min_length === 'number') form.append('min_length', String(options.min_length));
  if (options && typeof options.max_length === 'number') form.append('max_length', String(options.max_length));
  if (options && typeof options.include_timestamps === 'boolean') form.append('include_timestamps', String(options.include_timestamps));

  const res = await fetch(`${DEFAULT_BACKEND_URL}/extract`, {
    method: 'POST',
    body: form
  });
  await assertOk(res);
  return res.json(); // { quotes: Quote[] }
}

// PUBLIC_INTERFACE
export async function formatQuotes({ quotes, platform = 'generic', hashtag = null, url = null, style = null, max_chars = null }) {
  /**
   * Format quotes for social media by posting JSON to /format.
   */
  const payload = {
    quotes,
    platform,
    hashtag,
    url,
    style,
    max_chars
  };

  const res = await fetch(`${DEFAULT_BACKEND_URL}/format`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  await assertOk(res);
  return res.json(); // { items: FormattedQuote[] }
}
