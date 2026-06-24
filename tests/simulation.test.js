import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RUN_STATUS,
  advanceSimulation,
  createInitialState,
  formatElapsed,
  startSimulation,
} from '../src/simulation.js';

test('the initial simulation is ready with stable seeded work', () => {
  const state = createInitialState();

  assert.equal(state.status, RUN_STATUS.IDLE);
  assert.deepEqual(state.intake.map(({ id }) => id), [8, 9, 10]);
  assert.deepEqual(state.processing.map(({ id }) => id), [6, 7]);
  assert.equal(state.completed.length, 5);
});

test('starting a run records the transition once', () => {
  const running = startSimulation(createInitialState(), '10:00:00 AM');

  assert.equal(running.status, RUN_STATUS.RUNNING);
  assert.equal(running.activity[0].message, 'Run started');
  assert.strictEqual(startSimulation(running), running);
});

test('a running tick advances each stage and its metrics', () => {
  const running = startSimulation(createInitialState());
  const next = advanceSimulation(running, '10:00:01 AM');

  assert.equal(next.elapsedSeconds, 1);
  assert.deepEqual(next.intake.map(({ id }) => id), [9, 10, 11]);
  assert.deepEqual(next.processing.map(({ id }) => id), [7, 8]);
  assert.deepEqual(next.completed.map(({ id }) => id), [1, 2, 3, 4, 5, 6]);
  assert.equal(next.currentStreak, 6);
  assert.match(next.activity[0].message, /entered Intake/);
});

test('an idle simulation does not advance', () => {
  const idle = createInitialState();

  assert.strictEqual(advanceSimulation(idle), idle);
});

test('elapsed time is formatted for the metrics rail', () => {
  assert.equal(formatElapsed(0), '00:00:00');
  assert.equal(formatElapsed(68), '00:01:08');
});

