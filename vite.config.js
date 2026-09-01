import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true
    }),
    react(),
  ],
  resolve: {
    // Force a single React instance even if a dependency bundles its own copy.
    // Two React copies at runtime cause "Cannot read properties of null
    // (reading 'useState')" because hooks read from one dispatcher while the
    // app renders with the other.
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Force a full re-bundle on every server start. Vite's dep optimizer can
    // otherwise leave `react` from one optimization pass and `react-dom` from
    // another in its cache → two React copies → "Cannot read properties of
    // null (reading 'useState')". A forced full re-bundle guarantees both
    // share a single optimization pass (one ?v= hash) every restart.
    force: true,
    // Source-load the JSX runtimes instead of pre-bundling them. With the
    // automatic JSX runtime, `react/jsx-dev-runtime` is only discovered AFTER
    // the initial dep scan, so Vite fires a SECOND optimization pass with a
    // new ?v= hash. The browser then loads `react` from pass 1 and
    // `react-dom` from pass 2 → two React copies → "Cannot read properties of
    // null (reading 'useState')". Excluding these keeps everything in one
    // pass; their internal `import 'react'` still resolves to the pre-bundled
    // react chunk, so there is a single React instance.
    exclude: ['react/jsx-dev-runtime', 'react/jsx-runtime'],
    // App.jsx statically imports every page, so Vite's initial dep scan already
    // discovers all heavy libs (recharts, three, jspdf, …) in the FIRST
    // optimization pass — no need to force-list them (doing so risks optimizer
    // failures on exotic packages). Only React core + the universally-used
    // framer-motion are listed to guarantee a single shared react chunk.
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'scheduler',
      'framer-motion',
      'lodash',
    ],
  },
});