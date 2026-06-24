import { formatElapsed } from '../simulation.js';

function MetricIcon({ type }) {
  if (type === 'time') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === 'complete') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m13 2-7 11h5l-1 9 8-12h-5V2Z" />
    </svg>
  );
}

function Metric({ icon, label, value }) {
  return (
    <div className="metric">
      <MetricIcon type={icon} />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export function Metrics({ elapsedSeconds, completed, currentStreak }) {
  return (
    <section className="metrics" aria-label="Run metrics">
      <Metric icon="time" label="Elapsed" value={formatElapsed(elapsedSeconds)} />
      <Metric icon="complete" label="Completed" value={completed} />
      <Metric icon="streak" label="Current streak" value={currentStreak} />
    </section>
  );
}

