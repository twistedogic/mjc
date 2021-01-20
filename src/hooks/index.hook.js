import { toast } from "react-toastify";
import { useStorageReducer } from "react-storage-hooks";

export const indexReducer = (index, { type, id, name }) => {
  switch (type) {
    case "ADD":
      return { ...index, [id]: name };
    case "DELETE":
      return Object.keys(index).reduce((obj, key) => {
        if (key !== id) {
          obj[key] = index[key];
        }
        return obj;
      }, {});
    default:
      return index;
  }
};

export const useIndex = (store) => {
  const [index, dispatch, err] = useStorageReducer(
    store,
    "index",
    indexReducer,
    {}
  );
  if (err) {
    toast.error("Fail to access local storage");
    console.error(err);
  }
  return {
    index,
    add: (id, name) => dispatch({ type: "ADD", id, name }),
    delete: (id) => dispatch({ type: "DELETE", id }),
  };
};
