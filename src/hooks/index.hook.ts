import { toast } from "react-toastify";
import { useStorageReducer } from "react-storage-hooks";

type GameIndex = {
  name: string;
  gameId: string;
};

const ADD = "ADD";
const DELETE = "DELETE";

type ACTIONTYPE =
  | { type: typeof ADD; id: string; name: string }
  | { type: typeof DELETE; id: string };

export const indexReducer = (
  index: Array<GameIndex>,
  action: ACTIONTYPE
): Array<GameIndex> => {
  switch (action.type) {
    case ADD:
      return [...index, { gameId: action.id, name: action.name }];
    case "DELETE":
      return index.filter(({ gameId }) => gameId !== action.id);
    default:
      return index;
  }
};

export const useIndex = (store: Storage) => {
  const [index, dispatch, err] = useStorageReducer(
    store,
    "index",
    indexReducer,
    []
  );
  if (err) {
    toast.error("Fail to access local storage");
    console.error(err);
  }
  return {
    index,
    add: (id: string, name: string) => dispatch({ type: "ADD", id, name }),
    delete: (id: string) => dispatch({ type: "DELETE", id }),
  };
};
