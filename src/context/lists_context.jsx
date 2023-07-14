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
  REMOVE_LIST_ITEM,
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

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(
        `https://64b18130062767bc48264d85.mockapi.io/api/house/house/${id}`
      ); // Make the delete request to the server
      if (response.status === 200) {
        dispatch({ type: REMOVE_LIST_ITEM, payload: id }); // Update the local state
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const fetchLists = async (url) => {
    dispatch({ type: GET_LISTS_BEGIN });

    try {
      const response = await axios.get(
        "https://64b18130062767bc48264d85.mockapi.io/api/house/house"
      );
      const lists = response.data;
      console.log(lists); // Access the actual data
      dispatch({ type: GET_LISTS_SUCCESS, payload: lists });
    } catch (error) {
      dispatch({ type: GET_LISTS_ERROR });
    }
  };

  useEffect(() => {
    fetchLists(url);
  }, []); // Empty dependency array

  return (
    <ListsContext.Provider
      value={{ ...state, removeItem, openSidebar, closeSidebar, fetchLists }}
    >
      {children}
    </ListsContext.Provider>
  );
};
export const useListsContext = () => {
  return useContext(ListsContext);
};
