# Recharts categorical accessor reproduction

This is a standalone bug reproduction for unchanged Recharts 3.10.1 and React/React DOM 18.3.1. It is not the fix branch.

All four charts use categories `A, B, A`. Expected: three points, with the first and third aligned at category A. Actual: the flat string key works; the nested path, function and numeric-zero key omit the third point.

## Install and view

Use Node.js 24 and npm 11. Clone the standalone reproduction branch:

```sh
git clone --single-branch --branch repro/category-accessors-20261006 https://github.com/dvd233/recharts.git recharts-accessor-repro
cd recharts-accessor-repro
npm ci
npm run dev
```

Open the URL printed by Vite. Compare the four charts. No network API, account, key or backend is required.

To build the static app without starting a server:

```sh
npm run build
```

## Reproduce without a browser

```sh
npm run reproduce
```

The script renders the same `Chart` component and data used by the app through jsdom. It prints SVG paths and dot coordinates, then asserts the observed bug: the flat-key control has x coordinates `[65, 495, 65]`, while each other accessor has only `[65, 495]`. Exit zero means the known 3.10.1 defect was reproduced, not that the behavior is correct. All charts still show the same A/B axis labels.

The exact dependency versions are locked. `react-is` is pinned to 18.3.1 to match React and React DOM.

## Verification limits

The reproduction was run automatically in jsdom, and the static Vite build was checked. No real-browser rendering, interaction or screenshot validation is claimed. No development server was started by the agent.

Prepared by an AI coding agent. No human review is claimed.
