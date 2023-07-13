import axios from "axios";
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducers/lists_reducer";
import { post_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  lists_loading: false,
  lists_error: false,
  lists: [],
};
const apiKey = "gj3cfCPirnAEWk-JKhGtb85yX61I04O2";
const ListsContext = React.createContext(initialState);

export const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const fetchLists = async (url) => {
    dispatch({ type: GET_LISTS_BEGIN });

    const headers = {
      "X-Api-Key": apiKey,
    };
    try {
      const response = await axios.get(url, { headers });
      const lists = response.data;
      console.log(lists); // Access the actual data
      dispatch({ type: GET_LISTS_SUCCESS, payload: lists });
    } catch (error) {
      dispatch({ type: GET_LISTS_ERROR });
    }
  };
  useEffect(() => {
    fetchLists(url);
  }, []);
  return (
    <ListsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchLists }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => {
  return useContext(ListsContext);
};
