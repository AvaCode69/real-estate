import React from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
import { FaShower, FaBed, FaRuler, FaTrash, FaEdit } from "react-icons/fa";
import { useListsContext } from "../context/lists_context";

const ListView = ({ lists }) => {
  const { removeItem } = useListsContext();
  return (
    <div>
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
          <section className="lists">
            <article className="single-list" key={id}>
              <Link to={`/lists/${id}`} className=" ">
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
                    console.log("Removing item with ID2:", id);
                    removeItem(id);
                  }}
                >
                  {" "}
                  <FaTrash />{" "}
                </button>
                <FaEdit />
              </div>
            </article>
          </section>
        );
      })}
    </div>
  );
};

export default ListView;
