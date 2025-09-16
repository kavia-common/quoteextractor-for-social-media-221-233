import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function UploadForm({ onSubmit, disabled }) {
  /** Upload form accepts optional file and/or transcript text plus extraction options. */
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [topK, setTopK] = useState(5);
  const [minLength, setMinLength] = useState(40);
  const [maxLength, setMaxLength] = useState(240);
  const [includeTimestamps, setIncludeTimestamps] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      file,
      transcript: transcript.trim().length ? transcript : null,
      options: {
        top_k: Number(topK),
        min_length: Number(minLength),
        max_length: Number(maxLength),
        include_timestamps: includeTimestamps
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Upload transcript or paste text</h2>
      <div className="grid two">
        <div className="form-group">
          <label htmlFor="file">Transcript file (.txt, .srt, .vtt)</label>
          <input
            id="file"
            type="file"
            accept=".txt,.srt,.vtt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="transcript">Transcript text</label>
          <textarea
            id="transcript"
            placeholder="Paste transcript text here..."
            rows={6}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      <h3>Extraction options</h3>
      <div className="grid four">
        <div className="form-group">
          <label htmlFor="topK">Top K</label>
          <input
            id="topK"
            type="number"
            min={1}
            max={50}
            value={topK}
            onChange={(e) => setTopK(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="minLength">Min length</label>
          <input
            id="minLength"
            type="number"
            min={10}
            max={1000}
            value={minLength}
            onChange={(e) => setMinLength(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxLength">Max length</label>
          <input
            id="maxLength"
            type="number"
            min={20}
            max={4000}
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            disabled={disabled}
          />
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={includeTimestamps}
              onChange={(e) => setIncludeTimestamps(e.target.checked)}
              disabled={disabled}
            />
            Include timestamps
          </label>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          {disabled ? 'Extracting…' : 'Extract Quotes'}
        </button>
      </div>
    </form>
  );
}
