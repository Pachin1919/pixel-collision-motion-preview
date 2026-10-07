export const SESSION_MS = 45_000;
export type Target = { id: number; x: number; y: number };
export type GameState = {
  status: "idle" | "running" | "paused" | "ended";
  remaining: number;
  score: number;
  targets: Target[];
};
export const initialGame = (): GameState => ({
  status: "idle",
  remaining: SESSION_MS,
  score: 0,
  targets: [],
});
export function advanceGame(state: GameState, elapsed: number): GameState {
  if (state.status !== "running") return state;
  const remaining = Math.max(0, state.remaining - Math.max(0, elapsed));
  return {
    ...state,
    remaining,
    status: remaining === 0 ? "ended" : "running",
    targets: remaining === 0 ? [] : state.targets,
  };
}
export function collectTarget(state: GameState, id: number): GameState {
  if (state.status !== "running" || !state.targets.some((t) => t.id === id)) return state;
  return { ...state, score: state.score + 1, targets: state.targets.filter((t) => t.id !== id) };
}
export function collisionIds(targets: Target[], x: number, y: number, radius: number): number[] {
  return targets
    .filter((t) => Math.abs(t.x - x) <= radius && Math.abs(t.y - y) <= radius)
    .map((t) => t.id);
}
