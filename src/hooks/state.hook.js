import { useStorageReducer } from "react-storage-hooks";
import { toast } from "react-toastify";
import { getNewState, calculateState } from "./state";
import { defaultConfig } from "../constants";

export const gameStateReducer = (state, { config, idx, update }) => {
  if (config) {
    return { ...state, config };
  }
  const { records } = state;
  const newRecords = [...records];
  if (!idx) {
    newRecords.push(update);
  } else if (!update) {
    newRecords.splice(idx, 1);
  } else {
    newRecords[idx] = update;
  }
  return { ...state, records: newRecords };
};

const defaultState = {
  config: defaultConfig,
  records: [],
};

export const useGameState = (store, key) => {
  const [game, dispatch, err] = useStorageReducer(
    store,
    key,
    gameStateReducer,
    defaultState
  );
  if (err) {
    toast.error("Fail to access local storage");
    console.error(err);
  }
  const setConfig = (config) => {
    dispatch({ config });
  };
  const editRecord = (idx, update) => {
    dispatch({ idx, update });
  };
  const removeRecord = (idx) => {
    dispatch({ idx });
  };
  const addRecord = (update) => {
    dispatch({ update });
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
