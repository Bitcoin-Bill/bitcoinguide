import React from "react";

// Dev-only boundary that catches the "two React copies" runtime failure
// (null dispatcher / useState) — a stale Vite optimizer cache in the preview
// sandbox serves react and react-dom from different optimization passes. App
// code can't bypass the browser's immutable chunk cache, so instead of a
// cryptic blank screen we surface clear guidance to hard-refresh.
const HEALABLE = /dispatcher|useState|Cannot read properties of null/i;

class DevCacheErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, healable: false };
  }

  static getDerivedStateFromError(error) {
    const msg = (error && (error.message || String(error))) || "";
    return { error, healable: HEALABLE.test(msg) };
  }

  handleRetry = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("_hard", Date.now());
    window.location.replace(url.toString());
  };

  render() {
    if (this.state.healable) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-parchment text-ink p-6">
          <div className="max-w-md text-center font-body">
            <h1 className="font-heading text-2xl mb-3">Stale dev cache detected</h1>
            <p className="text-lead mb-4 leading-relaxed">
              The preview is holding two mismatched copies of React from a stale
              Vite optimizer cache. This can&apos;t be cleared from app code.
            </p>
            <p className="text-lead mb-6 leading-relaxed">
              Please do a <strong>hard refresh</strong> in the preview:
              <br />
              <span className="font-mono text-sm">Cmd+Shift+R</span> (Mac) or{" "}
              <span className="font-mono text-sm">Ctrl+Shift+R</span> (Windows).
            </p>
            <button
              onClick={this.handleRetry}
              className="font-mono text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-md bg-primary text-primary-foreground"
            >
              Retry now
            </button>
          </div>
        </div>
      );
    }
    // Re-throw non-healable errors so Vite's dev overlay still handles them.
    if (this.state.error) {
      throw this.state.error;
    }
    return this.props.children;
  }
}

export default DevCacheErrorBoundary;