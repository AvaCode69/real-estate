// lists_reducer.jsx
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  REMOVE_LIST_ITEM,
} from "../actions";

const lists_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_LISTS_BEGIN) {
    return { ...state, lists_loading: true };
  }
  if (action.type === GET_LISTS_SUCCESS) {
    return {
      ...state,
      lists_loading: false,
      lists: action.payload,
    };
  }
  if (action.type === GET_LISTS_ERROR) {
    return { ...state, lists_loading: false, lists_error: true };
  }

  if (action.type === REMOVE_LIST_ITEM) {
    const newList = state.lists.filter((item) => item.id !== action.payload);
    console.log("Removing item with ID3:", newList);

    return { ...state, lists: newList };
  }

  throw new Error(`No Matching - action type`);
};

export default lists_reducer;
