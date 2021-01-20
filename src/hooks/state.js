import { defaultConfig } from "../constants";
import { scoreMode } from "../util/score";

export const getNewState = (config = defaultConfig) => (state, update) => {
  const { mode, maxScore, base, selfDrawnPayRatio } = config;
  const toPayout = scoreMode[mode](base);
  const { winners, losers, score } = update;
  const capScore = score > maxScore ? maxScore : score;
  let payout = toPayout(capScore);
  if (losers.length === 3) {
    payout *= selfDrawnPayRatio;
  }
  const newState = [...state];
  winners.forEach((winner) => {
    newState[winner] += losers.length * payout;
  });
  losers.forEach((loser) => {
    newState[loser] -= winners.length * payout;
  });
  return newState;
};

export const calculateState = (updater) => (records) =>
  records.reduce(
    (state, record) => {
      const last = state.length === 0 ? {} : state[state.length - 1];
      const newState = updater(last, record);
      return [...state, newState];
    },
    [[0, 0, 0, 0]]
  );
