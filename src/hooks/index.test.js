import { renderHook, act } from "@testing-library/react-hooks";
import { useIndex, useGameState } from "./index";
import { memStore as mockStore } from "../util/store";

describe("useIndex", () => {
  it("should modify index", () => {
    const store = new mockStore();
    const { result } = renderHook(() => useIndex(store));
    act(() => {
      result.current.add("a", "name");
    });
    expect(result.current.index).toMatchObject({ a: "name" });
    act(() => {
      result.current.delete("a");
    });
    expect(result.current.index).toMatchObject({});
  });

  it("should modify index with initalState", () => {
    const initalState = { index: JSON.stringify({ b: "other" }) };
    const store = new mockStore(initalState);
    const { result } = renderHook(() => useIndex(store));
    act(() => {
      result.current.add("a", "name");
    });
    expect(result.current.index).toMatchObject({ a: "name", b: "other" });
    act(() => {
      result.current.delete("b");
    });
    expect(result.current.index).toMatchObject({ a: "name" });
  });
});

describe("useGameState", () => {
  it("should modify game state", () => {
    const key = "active";
    const store = new mockStore();
    const { result } = renderHook(() => useGameState(store, key));
    act(() => {
      result.current.addRecord({ winners: [1], losers: [0], score: 10 });
      result.current.addRecord({ winners: [2], losers: [3], score: 4 });
      result.current.addRecord({ winners: [1], losers: [0], score: 3 });
    });
    expect(result.current.state).toMatchObject([
      [0, 0, 0, 0],
      [-128, 128, 0, 0],
      [-128, 128, 16, -16],
      [-136, 136, 16, -16],
    ]);
    act(() => {
      result.current.removeRecord(1);
    });
    expect(result.current.state).toMatchObject([
      [0, 0, 0, 0],
      [-128, 128, 0, 0],
      [-136, 136, 0, 0],
    ]);
    act(() => {
      result.current.editRecord(1, { winners: [], losers: [], score: 0 });
    });
    expect(result.current.state).toMatchObject([
      [0, 0, 0, 0],
      [-128, 128, 0, 0],
      [-128, 128, 0, 0],
    ]);
  });
});
