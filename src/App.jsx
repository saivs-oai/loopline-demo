import { ActivityLog } from './components/ActivityLog.jsx';
import { Metrics } from './components/Metrics.jsx';
import { Pipeline } from './components/Pipeline.jsx';
import { RUN_STATUS } from './simulation.js';
import { useSimulation } from './useSimulation.js';

export default function App() {
  const { state, start, reset } = useSimulation();
  const isRunning = state.status === RUN_STATUS.RUNNING;

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#main" className="brand">Loopline</a>
        <div className="status" aria-live="polite">
          <span className={`status__dot ${isRunning ? 'status__dot--running' : ''}`} />
          {isRunning ? 'Running' : 'Ready'}
        </div>
      </header>

      <main id="main">
        <div className="intro">
          <h1>Keep the work moving.</h1>
          <div className="controls">
            <button className="button button--primary" onClick={start} disabled={isRunning}>
              {isRunning ? 'Running' : 'Start run'}
            </button>
            <button className="button button--secondary" onClick={reset}>Reset</button>
          </div>
        </div>

        <Pipeline
          intake={state.intake}
          processing={state.processing}
          completed={state.completed}
        />
        <Metrics
          elapsedSeconds={state.elapsedSeconds}
          completed={state.completed.length}
          currentStreak={state.currentStreak}
        />
        <ActivityLog entries={state.activity} />
      </main>
    </div>
  );
}

