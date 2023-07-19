import axios from "axios";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../reducers/lists_reducer";
import { post_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_LISTS_BEGIN,
  GET_LISTS_SUCCESS,
  GET_LISTS_ERROR,
  REMOVE_LIST_ITEM,
  ADD_TO_LIST,
  GET_SINGLE_ITEM_SUCCESS,
  GET_SINGLE_ITEM_ERROR,
  GET_SINGLE_ITEM_BEGIN,
  OPEN_MODAL,
  CLOSE_MODAL,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  lists_loading: true,
  lists_error: false,
  lists: [],
  single_item_loading: false,
  single_item_error: false,
  single_item: {},
  postId: "",
  removeMessage: "",
  isOpen: false,
};

const ListsContext = createContext();

export const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [imageURL, setImageURL] = useState("");
  const [addItemMessage, setAddItemMessage] = useState("");

  const [formData, setFormData] = useState({
    price: "1500",
    bedrooms: "2",
    bathrooms: "2",
    size: "200",
    streetName: "funen",
    houseNumber: "255",
    numberAddition: "56",
    zip: "1487TD",
    city: "Utrecht",
    image: "",
    constructionYear: "156",
    hasGarage: "no",
    description: "fddf mkkdmk kmkm kme mm",
  });
  const [invalidFields, setInvalidFields] = useState([]);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const openModal = () => {
    dispatch({ type: OPEN_MODAL });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      if (response.status === 200) {
        dispatch({ type: REMOVE_LIST_ITEM, payload: id });
      }
    } catch (error) {
      console.log("Error removing item:", error);
    }
  };

  const fetchLists = async () => {
    dispatch({ type: GET_LISTS_BEGIN });

    try {
      const response = await axios.get(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      const lists = response.data;
      dispatch({ type: GET_LISTS_SUCCESS, payload: lists });
    } catch (error) {
      dispatch({ type: GET_LISTS_ERROR });
    }
  };

  const fetchSingleItem = async (url) => {
    dispatch({ type: GET_SINGLE_ITEM_BEGIN });
    const response = await axios.get(url);
    const singleItem = response.data;
    console.log(singleItem);
    try {
      dispatch({ type: GET_SINGLE_ITEM_SUCCESS, payload: singleItem });
    } catch {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };
  const addToList = async () => {
    const response = await axios.post(url);
    setAddItemMessage(" ");

    try {
      dispatch({ type: ADD_TO_LIST, payload: response.data });
      if (response.status === 201) {
        // setAddItemMessage("Item added successfully");
        fetchLists(url);
        setFormData({
          price: "",
          bedrooms: "",
          bathrooms: "",
          size: "",
          streetName: "",
          houseNumber: "",
          numberAddition: "",
          zip: "",
          city: "",
          image: "",
          constructionYear: "",
          hasGarage: "no",
          description: "",
        });
        setImageURL("");
      }
    } catch (error) {
      dispatch({ type: GET_SINGLE_ITEM_ERROR });
    }
  };
  const validateForm = () => {
    const requiredFields = [
      "price",
      "bedrooms",
      "bathrooms",
      "size",
      "description",
      "streetName",
      "houseNumber",
      "numberAddition",
      "zip",
      "city",
      "constructionYear",
      "description",
      "image",
    ];
    const invalidFieldsList = [];

    requiredFields.forEach((field) => {
      if (!isNotEmpty(formData[field])) {
        invalidFieldsList.push(field);
      }
    });

    setInvalidFields(invalidFieldsList);
    return invalidFieldsList.length === 0;
  };

  const isNotEmpty = (value) => {
    const trimmedValue = String(value).trim();
    return trimmedValue !== "";
  };

  useEffect(() => {
    fetchLists();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: GET_LISTS_SUCCESS, payload: state.lists }); // Clear the message state
    }, 2000);

    return () => clearTimeout(timeout);
  }, [state.lists]);
  return (
    <ListsContext.Provider
      value={{
        ...state,
        removeItem,
        openSidebar,
        closeSidebar,
        fetchLists,
        fetchSingleItem,
        invalidFields,
        validateForm,
        formData,
        setFormData,
        addToList,
        imageURL,
        setImageURL,
        setAddItemMessage,
        addItemMessage,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useListsContext = () => {
  return useContext(ListsContext);
};
