const baseScore = [1, 2, 4, 8, 16];

export const half = (base: number) => (score: number) => {
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

export const ratio = (r: number) => (base: number) => (score: number) => {
  return base * Math.pow(r, score);
};

interface ScoreMode {
  [index: string]: (base: number) => (score: number) => number;
}

export const scoreMode: ScoreMode = {
  half,
  double: ratio(2),
};
