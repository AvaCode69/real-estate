import React from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
import { FaShower, FaBed, FaRuler, FaTrash, FaEdit } from "react-icons/fa";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { ItemList, Loading, Error } from "../components";

const ListView = ({ lists }) => {
  const {
    removeItem,
    lists_loading: loading,
    lists_error: error,
    removeMessage,
    openModal,
  } = useListsContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="lists">
      {removeMessage && <p className="message">{removeMessage}</p>}
      {lists.map((item) => {
        const {
          id,
          image,
          price,
          description,
          size,
          street,
          zip,
          city,
          bedrooms,
          bathrooms,
        } = item;
        return (
          <article className="single-list" key={id}>
            <Link to={`/${id}`} className=" ">
              <img src={image} />{" "}
            </Link>
            <div>
              <h5>{street}</h5>
              <p className="price">€{price}</p>
              <p className="location">
                {zip} {city}
              </p>
              <div className="single-list-info">
                <p>
                  <FaBed />
                  {bedrooms}{" "}
                </p>
                <p>
                  <FaShower />
                  {bathrooms}
                </p>
                <p>
                  <FaRuler />
                  {size} m2
                </p>
              </div>
            </div>
            <div className="single-list-modify">
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  openModal();
                }}
              >
                {" "}
                <FaTrash />{" "}
              </button>
              <FaEdit />
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ListView;
