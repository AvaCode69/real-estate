import React from "react";
import { useListsContext } from "../context/lists_context";
import ListView from "./ListView";
const ItemList = () => {
  const { lists } = useListsContext();
  if (lists.length < 1) {
    return <h5 style={{ textTransform: "none" }}>Sorry, no House exist.</h5>;
  }

  return <ListView lists={lists} />;
};

export default ItemList;
