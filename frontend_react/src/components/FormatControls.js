import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
export default function FormatControls({ onFormat, disabled, hasQuotes }) {
  /** Controls for formatting options and submit to backend. */
  const [platform, setPlatform] = useState('generic');
  const [hashtag, setHashtag] = useState('');
  const [url, setUrl] = useState('');
  const [style, setStyle] = useState('');
  const [maxChars, setMaxChars] = useState('');

  useEffect(() => {
    // Reasonable defaults based on platform
    if (platform === 'twitter') setMaxChars('280');
  }, [platform]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormat({
      platform,
      hashtag: hashtag.trim() || null,
      url: url.trim() || null,
      style: style.trim() || null,
      max_chars: maxChars ? Number(maxChars) : null
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Format for Social Sharing</h2>
      <div className="grid four">
        <div className="form-group">
          <label htmlFor="platform">Platform</label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            disabled={disabled}
          >
            <option value="generic">Generic</option>
            <option value="twitter">Twitter/X</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="hashtag">Hashtag</label>
          <input
            id="hashtag"
            placeholder="#YourTag"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="style">Style</label>
          <input
            id="style"
            placeholder="concise, punchy, inspirational..."
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid one">
        <div className="form-group">
          <label htmlFor="maxChars">Max characters per quote (optional)</label>
          <input
            id="maxChars"
            type="number"
            min={40}
            max={4000}
            placeholder="e.g., 280 for Twitter"
            value={maxChars}
            onChange={(e) => setMaxChars(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={disabled || !hasQuotes}>
          {disabled ? 'Formatting…' : 'Format Quotes'}
        </button>
      </div>
    </form>
  );
}
