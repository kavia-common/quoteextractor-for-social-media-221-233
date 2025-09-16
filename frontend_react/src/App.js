import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';

import UploadForm from './components/UploadForm';
import QuoteList from './components/QuoteList';
import FormatControls from './components/FormatControls';
import ExportPanel from './components/ExportPanel';
import { extractQuotes, formatQuotes, healthCheck } from './services/api';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main app providing:
   * - Theme toggle
   * - Upload text/file and extract quotes
   * - Edit quote list
   * - Format and export
   */
  const [theme, setTheme] = useState('light');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [quotes, setQuotes] = useState([]);
  const [formatted, setFormatted] = useState([]);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingFormat, setLoadingFormat] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        await healthCheck();
        if (isMounted) setBackendStatus('online');
      } catch (e) {
        if (isMounted) setBackendStatus('offline');
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const hasQuotes = useMemo(() => quotes.length > 0, [quotes]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const handleExtract = async ({ file, transcript, options }) => {
    setError('');
    setLoadingExtract(true);
    setFormatted([]);
    try {
      const res = await extractQuotes({ file, transcript, options });
      setQuotes(res.quotes || []);
      if (!res.quotes || res.quotes.length === 0) {
        setError('No quotes were extracted. Try adjusting options or providing a different input.');
      }
    } catch (e) {
      setError(e?.message || 'Failed to extract quotes.');
    } finally {
      setLoadingExtract(false);
    }
  };

  const handleFormat = async (opts) => {
    setError('');
    setLoadingFormat(true);
    try {
      const res = await formatQuotes({ quotes, ...opts });
      setFormatted(res.items || []);
      if (!res.items || res.items.length === 0) {
        setError('Received empty formatting results.');
      }
    } catch (e) {
      setError(e?.message || 'Failed to format quotes.');
    } finally {
      setLoadingFormat(false);
    }
  };

  const handleChangeQuote = (index, updated) => {
    setQuotes((prev) => prev.map((q, i) => (i === index ? updated : q)));
  };

  const handleRemoveQuote = (index) => {
    setQuotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddQuote = () => {
    setQuotes((prev) => [...prev, { text: '' }]);
  };

  const handleMoveUp = (index) => {
    setQuotes((prev) => {
      if (index <= 0) return prev;
      const arr = [...prev];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  };

  const handleMoveDown = (index) => {
    setQuotes((prev) => {
      if (index >= prev.length - 1) return prev;
      const arr = [...prev];
      [arr[index + 1], arr[index]] = [arr[index], arr[index + 1]];
      return arr;
    });
  };

  return (
    <div className="App">
      <header className="navbar">
        <div className="brand">Quote Extractor</div>
        <div className="spacer" />
        <div className={`status ${backendStatus}`}>
          {backendStatus === 'online' ? 'Backend: Online' : backendStatus === 'offline' ? 'Backend: Offline' : 'Checking backend…'}
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="container">
        {error ? <div className="alert alert-error">{error}</div> : null}

        <UploadForm onSubmit={handleExtract} disabled={loadingExtract} />

        <QuoteList
          quotes={quotes}
          onChange={handleChangeQuote}
          onRemove={handleRemoveQuote}
          onAddNew={handleAddQuote}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
        />

        <FormatControls onFormat={handleFormat} disabled={loadingFormat} hasQuotes={hasQuotes} />

        <ExportPanel items={formatted} />
      </main>

      <footer className="footer">
        <div className="container small">
          <span>Built with ❤️ using React. Configure backend URL via REACT_APP_BACKEND_URL.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
