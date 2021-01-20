import { baseScore } from "../constants";

export const half = (base) => (score) => {
  if (score <= 4) {
    return baseScore[score] * base;
  }
  let register = [8, 16];
  for (let i = 5; i <= score; i++) {
    let n = register[1] * 1.5;
    if (i % 2 === 0) {
      n = register[0] * 2;
    }
    register[0] = register[1];
    register[1] = n;
  }
  return register[1] * base;
};

export const ratio = (r) => (base) => (score) => {
  return base * Math.pow(r, score);
};

export const scoreMode = {
  half,
  double: ratio(2),
};
