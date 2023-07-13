// lists_reducer.tsx
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
} from "../actions";

const lists_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    case GET_LISTS_BEGIN:
      return { ...state, lists_loading: true };
    case GET_LISTS_SUCCESS:
      return {
        ...state,
        lists_loading: false,
        lists: action.payload,
      };
    case GET_LISTS_ERROR:
      return { ...state, lists_loading: false, lists_error: true };
    default:
      throw new Error(`No Matching - action type`);
  }
};

export default lists_reducer;
