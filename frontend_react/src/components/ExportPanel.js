import React from 'react';

// PUBLIC_INTERFACE
export default function ExportPanel({ items }) {
  /** Displays formatted items with copy-to-clipboard helpers. */
  const copyAll = async () => {
    const text = (items || []).map((i) => i.formatted).join('\n\n');
    if (text) {
      await navigator.clipboard.writeText(text);
      alert('All formatted quotes copied to clipboard.');
    }
  };

  const copyOne = async (formatted) => {
    if (formatted) {
      await navigator.clipboard.writeText(formatted);
      alert('Copied to clipboard.');
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="card">
        <h2>Formatted Output</h2>
        <p>No formatted results yet. Use the formatting panel to generate shareable text.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Formatted Output</h2>
      <div className="actions">
        <button className="btn" onClick={copyAll}>Copy All</button>
      </div>
      <ul className="formatted-list">
        {items.map((it, idx) => (
          <li key={idx} className="formatted-item">
            <pre className="formatted-text">{it.formatted}</pre>
            <div className="row-actions">
              <span className="pill">len: {it.length}</span>
              <button className="btn" onClick={() => copyOne(it.formatted)}>Copy</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
