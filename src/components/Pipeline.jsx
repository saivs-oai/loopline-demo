function Stage({ label, items, tone }) {
  return (
    <section className={`stage stage--${tone}`} aria-label={`${label}: ${items.length} items`}>
      <div className="stage__heading">
        <h2>{label}</h2>
        <span>{items.length}</span>
      </div>
      <div className="stage__track">
        {items.slice(-7).map((workItem) => (
          <span className="work-item" key={workItem.id}>
            {workItem.id}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Pipeline({ intake, processing, completed }) {
  return (
    <div className="pipeline" aria-label="Work pipeline">
      <Stage label="Intake" items={intake} tone="intake" />
      <Stage label="Processing" items={processing} tone="processing" />
      <Stage label="Complete" items={completed} tone="complete" />
    </div>
  );
}

