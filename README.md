# Loopline

Loopline is a deliberately small React application for practicing evidence-driven changes with Codex. It simulates work moving through Intake, Processing, and Complete once per second, making the feedback loop visible in both the UI and pure state tests.

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

## Executable feedback

```bash
npm test        # Pure state-engine unit tests
npm run lint    # ESLint across JavaScript and JSX
npm run build   # Production Vite build
npm run check   # Test, lint, then build
```

## Architecture

- `src/simulation.js` contains the deterministic state transitions.
- `src/useSimulation.js` owns the browser timer and connects it to the state engine.
- `src/App.jsx` composes the main flow and controls.
- `src/components/` contains the pipeline, metrics, and activity views.
- `tests/` covers the executable state loop with Node's built-in test runner.
- `docs/manual-validation.md` describes the browser smoke test.

Keep state changes in the pure engine where possible, and keep timer lifecycle behavior in the hook. This separation makes small behavioral slices easy to test before browser validation.

