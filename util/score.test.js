import { half, ratio } from "./score";

describe("half", () => {
  const cases = [
    { base: 1, score: 0, want: 1 },
    { base: 1, score: 1, want: 2 },
    { base: 1, score: 8, want: 64 },
    { base: 1, score: 10, want: 128 },
    { base: 2, score: 10, want: 256 },
  ];
  it.each(cases)("%j", ({ base, score, want }) => {
    const got = half(base)(score);
    expect(got).toBe(want);
  });
});

describe("ratio", () => {
  const cases = [
    { r: 2, base: 1, score: 0, want: 1 },
    { r: 2, base: 1, score: 1, want: 2 },
    { r: 2, base: 1, score: 2, want: 4 },
    { r: 2, base: 1, score: 10, want: 1024 },
    { r: 2, base: 0.5, score: 10, want: 512 },
  ];
  it.each(cases)("%j", ({ r, base, score, want }) => {
    const got = ratio(r)(base)(score);
    expect(got).toBe(want);
  });
});
