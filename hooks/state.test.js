import { getNewState, calculateState } from "./state";
import { defaultConfig } from "./state.hook";

describe("getNewState", () => {
  const cases = [
    {
      config: { ...defaultConfig },
      update: { winners: [0], losers: [1], score: 10 },
      state: [0, 0, 0, 0],
      want: [128, -128, 0, 0],
    },
    {
      config: { ...defaultConfig, base: 2 },
      update: { winners: [0], losers: [1], score: 10 },
      state: [0, 0, 0, 0],
      want: [256, -256, 0, 0],
    },
    {
      config: { ...defaultConfig },
      update: { winners: [0], losers: [1, 2, 3], score: 3 },
      state: [100, 100, 100, 100],
      want: [112, 96, 96, 96],
    },
  ];
  it.each(cases)("%j", ({ config, update, state, want }) => {
    const got = getNewState(config)(state, update);
    expect(got).toMatchObject(want);
  });
});

describe("calculateState", () => {
  const cases = [
    {
      config: { ...defaultConfig },
      records: [
        { winners: [0], losers: [1], score: 10 },
        { winners: [0], losers: [1], score: 10 },
        { winners: [0], losers: [1], score: 10 },
      ],
      want: [
        [0, 0, 0, 0],
        [128, -128, 0, 0],
        [256, -256, 0, 0],
        [384, -384, 0, 0],
      ],
    },
  ];
  it.each(cases)("%j", ({ config, records, want }) => {
    const got = calculateState(getNewState(config))(records);
    expect(got).toMatchObject(want);
  });
});
