import React from 'react';

// PUBLIC_INTERFACE
export default function QuoteList({ quotes, onChange, onRemove, onAddNew, onMoveUp, onMoveDown }) {
  /** Displays a list of quotes with inline editing and controls. */
  if (!quotes || quotes.length === 0) {
    return (
      <div className="card">
        <h2>Extracted Quotes</h2>
        <p>No quotes yet. Run an extraction to see results here.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Extracted Quotes</h2>
      <ul className="quote-list">
        {quotes.map((q, idx) => (
          <li key={idx} className="quote-item">
            <textarea
              value={q.text}
              onChange={(e) => onChange(idx, { ...q, text: e.target.value })}
              rows={3}
            />
            <div className="meta">
              {q.start_time != null && q.end_time != null ? (
                <span className="pill">⏱ {q.start_time}s – {q.end_time}s</span>
              ) : null}
              {q.source ? <span className="pill">📁 {q.source}</span> : null}
              {q.confidence != null ? <span className="pill">⭐ {Math.round(q.confidence * 100)}%</span> : null}
            </div>
            <div className="row-actions">
              <button className="btn" onClick={() => onMoveUp(idx)} disabled={idx === 0}>↑</button>
              <button className="btn" onClick={() => onMoveDown(idx)} disabled={idx === quotes.length - 1}>↓</button>
              <button className="btn btn-danger" onClick={() => onRemove(idx)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="btn" onClick={onAddNew}>+ Add Quote</button>
      </div>
    </div>
  );
}
