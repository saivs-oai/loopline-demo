export const RUN_STATUS = {
  IDLE: 'idle',
  RUNNING: 'running',
};

const item = (id) => ({ id });

export function createInitialState() {
  return {
    status: RUN_STATUS.IDLE,
    elapsedSeconds: 0,
    nextId: 11,
    intake: [item(8), item(9), item(10)],
    processing: [item(6), item(7)],
    completed: [item(1), item(2), item(3), item(4), item(5)],
    currentStreak: 5,
    activity: [],
  };
}

export function startSimulation(state, timeLabel = 'Now') {
  if (state.status === RUN_STATUS.RUNNING) return state;

  return {
    ...state,
    status: RUN_STATUS.RUNNING,
    activity: [
      { id: `start-${state.elapsedSeconds}`, timeLabel, message: 'Run started', tone: 'success' },
      ...state.activity,
    ],
  };
}

export function advanceSimulation(state, timeLabel = 'Now') {
  if (state.status !== RUN_STATUS.RUNNING) return state;

  const completedItem = state.processing[0];
  const promotedItem = state.intake[0];
  const freshItem = item(state.nextId);
  const updates = [
    {
      id: `enter-${state.nextId}-${state.elapsedSeconds}`,
      timeLabel,
      message: `Item ${freshItem.id} entered Intake`,
      tone: 'info',
    },
    {
      id: `promote-${promotedItem.id}-${state.elapsedSeconds}`,
      timeLabel,
      message: `Item ${promotedItem.id} moved from Intake to Processing`,
      tone: 'info',
    },
    {
      id: `complete-${completedItem.id}-${state.elapsedSeconds}`,
      timeLabel,
      message: `Item ${completedItem.id} moved from Processing to Complete`,
      tone: 'success',
    },
  ];

  return {
    ...state,
    elapsedSeconds: state.elapsedSeconds + 1,
    nextId: state.nextId + 1,
    intake: [...state.intake.slice(1), freshItem],
    processing: [...state.processing.slice(1), promotedItem],
    completed: [...state.completed, completedItem],
    currentStreak: state.currentStreak + 1,
    activity: [...updates, ...state.activity].slice(0, 6),
  };
}

export function formatElapsed(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

