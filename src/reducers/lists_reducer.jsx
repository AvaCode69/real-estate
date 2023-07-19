// lists_reducer.jsx
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  ADD_TO_LIST,
  REMOVE_LIST_ITEM,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_ITEM_BEGIN,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../actions";

const lists_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === OPEN_MODAL) {
    return { ...state, isOpen: true };
  }
  if (action.type === CLOSE_MODAL) {
    return { ...state, isOpen: false };
  }

  if (action.type === REMOVE_LIST_ITEM) {
    const newList = state.lists.filter((item) => item.id !== action.payload);
    console.log("Removing item with ID3:", newList);

    return {
      ...state,
      lists: newList,
      removeMessage: "Item removed successfully",
    };
  }
  if (action.type === GET_LISTS_BEGIN) {
    return { ...state, lists_loading: true };
  }
  if (action.type === GET_LISTS_SUCCESS) {
    return {
      ...state,
      lists_loading: false,
      lists: action.payload,
      removeMessage: " ",
      addMessage: "",
    };
  }
  if (action.type === GET_LISTS_ERROR) {
    return { ...state, lists_loading: false, lists_error: true };
  }

  if (action.type === GET_SINGLE_ITEM_BEGIN) {
    return {
      ...state,
      single_item_loading: false,
      single_item_error: false,
    };
  }

  if (action.type === GET_SINGLE_ITEM_SUCCESS) {
    return {
      ...state,
      lists_loading: false,
      single_item: action.payload,
    };
  }
  if (action.type === GET_SINGLE_ITEM_ERROR) {
    return { ...state, single_item_error: false, single_item_loading: true };
  }

  if (action.type === ADD_TO_LIST) {
    return {
      ...state,
      single_item_loading: true,
      single_item: action.payload,
    };
  }

  throw new Error(`No Matching - action type`);
};

export default lists_reducer;
