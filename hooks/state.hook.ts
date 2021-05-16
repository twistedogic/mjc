import { useStorageReducer } from "react-storage-hooks";
import { useNotifications } from "@mantine/notifications";
import { getNewState, calculateState } from "./state";

export interface GameConfig {
  players: Array<string>;
  maxScore: number;
  minScore: number;
  base: number;
  selfDrawnPayRatio: number;
  mode: string;
}

export interface RoundRecord {
  winners: Array<number>;
  losers: Array<number>;
  score: number;
}

export interface GameState {
  config: GameConfig;
  records: Array<RoundRecord>;
}

export const defaultConfig = {
  players: [],
  maxScore: 10,
  minScore: 3,
  base: 1,
  selfDrawnPayRatio: 0.5,
  mode: "half",
};

const defaultState = {
  config: defaultConfig,
  records: [],
};

const ADD_STATE = "ADD_STATE";
const DELETE_STATE = "DELETE_STATE";
const EDIT_STATE = "EDIT_STATE";
const SET_CONFIG = "SET_CONFIG";

type ACTIONTYPE =
  | { type: typeof ADD_STATE; update: RoundRecord }
  | { type: typeof EDIT_STATE; id: number; update: RoundRecord }
  | { type: typeof DELETE_STATE; id: number }
  | { type: typeof SET_CONFIG; config: GameConfig };

export const gameStateReducer = (state: GameState, action: ACTIONTYPE) => {
  switch (action.type) {
    case ADD_STATE:
      return {
        ...state,
        records: [...state.records, action.update],
      };
    case DELETE_STATE:
      return {
        ...state,
        records: state.records.filter((_, idx) => idx !== action.id),
      };
    case EDIT_STATE:
      return {
        ...state,
        records: state.records.map((r, idx) =>
          idx === action.id ? action.update : r
        ),
      };
    case SET_CONFIG:
      return {
        ...state,
        config: action.config,
      };
    default:
      return state;
  }
};

export const useGameState = (store: Storage, key?: string) => {
  const [game, dispatch, err] = useStorageReducer(
    store,
    key ?? "",
    gameStateReducer,
    defaultState
  );
  if (err) {
    notifications.showNotification({
      title: "Storage error",
      message: "Fail to access local storage",
      color: "red",
    });
    console.error(err);
  }
  const setConfig = (config: GameConfig) => {
    dispatch({ type: SET_CONFIG, config });
  };
  const editRecord = (id: number, update: RoundRecord) => {
    dispatch({ type: EDIT_STATE, id, update });
  };
  const removeRecord = (id: number) => {
    dispatch({ type: DELETE_STATE, id });
  };
  const addRecord = (update: RoundRecord) => {
    dispatch({ type: ADD_STATE, update });
  };
  const { records, config } = game;
  const updater = getNewState(config);
  const state = calculateState(updater)(records);
  const { players } = config;
  return {
    players,
    state,
    setConfig,
    editRecord,
    removeRecord,
    addRecord,
  };
};
