import React from "react";
import { Link } from "react-router-dom";
import {} from "react-icons/fa";
import { FaShower, FaBed, FaRuler, FaTrash, FaEdit } from "react-icons/fa";

const ListView = ({ lists }) => {
  return (
    <div>
      {lists.map((item) => {
        const { id, image, price, description, size, location, rooms } = item;
        return (
          <section className="lists">
            <Link to={`/lists/${id}`} className=" ">
              <article className="single-list" key={id}>
                <img src={image} />
                <div>
                  <h5>{location.street}</h5>
                  <p className="price">€{price}</p>
                  <p className="location">
                    {location.zip}
                    {location.city}
                  </p>
                  <div className="single-list-info">
                    <p>
                      <FaBed />
                      {rooms.bedrooms}{" "}
                    </p>
                    <p>
                      <FaShower />
                      {rooms.bathrooms}
                    </p>
                    <p>
                      <FaRuler />
                      {size} m2
                    </p>
                  </div>
                  <div>
                    <FaTrash />
                    <FaEdit />
                  </div>
                </div>
              </article>
            </Link>
          </section>
        );
      })}
    </div>
  );
};

export default ListView;
