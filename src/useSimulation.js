import { useEffect, useState } from 'react';
import {
  RUN_STATUS,
  advanceSimulation,
  createInitialState,
  startSimulation,
} from './simulation.js';

const currentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

export function useSimulation() {
  const [state, setState] = useState(createInitialState);

  useEffect(() => {
    if (state.status !== RUN_STATUS.RUNNING) return undefined;

    const timerId = window.setInterval(() => {
      setState((current) => advanceSimulation(current, currentTime()));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [state.status]);

  return {
    state,
    start: () => setState((current) => startSimulation(current, currentTime())),
    reset: () => setState(createInitialState()),
  };
}

