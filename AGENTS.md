# Repository Guidelines

## Structure

Loopline is a small React/Vite application. Keep deterministic workflow state and transitions in `src/simulation.js`; keep interval lifecycle behavior in `src/useSimulation.js`. `src/App.jsx` composes the screen, while reusable presentation belongs in `src/components/`. Unit tests live in `tests/`, and durable browser checks live in `docs/manual-validation.md`.

## Commands

- `npm install` installs dependencies.
- `npm run dev` starts the local Vite server, normally at `http://localhost:5173`.
- `npm test` runs Node unit tests for the state engine.
- `npm run lint` runs ESLint over JavaScript and JSX.
- `npm run build` verifies the production bundle.
- `npm run check` runs test, lint, and build in sequence.

## Conventions

Use ESM, two-space indentation, single quotes, and semicolons. Name React components in `PascalCase`, functions and variables in `camelCase`, and tests `*.test.js`. Prefer pure state transitions over embedding behavior in components. Keep `App.jsx` as composition glue and preserve accessible labels, focus states, and reduced-motion behavior.

## Validation and review

For behavioral changes, add or update a focused state-engine test first, then run `npm run check`. For visible or timer-related changes, also follow `docs/manual-validation.md` in a browser. Keep changes scoped; avoid unrelated refactors. Before handoff, review the diff for timer cleanup, state-transition edge cases, accessibility, responsive behavior, and undocumented validation gaps.
