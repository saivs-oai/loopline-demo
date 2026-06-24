export function ActivityLog({ entries }) {
  return (
    <section className="activity" aria-labelledby="activity-heading">
      <h2 id="activity-heading">Activity</h2>
      {entries.length === 0 ? (
        <p className="activity__empty">Start a run to see work move through the loop.</p>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={entry.id}>
              <time>{entry.timeLabel}</time>
              <span className={`activity__dot activity__dot--${entry.tone}`} />
              <span>{entry.message}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

