import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListsContext } from "../context/lists_context";
import { post_url as url } from "../utils/constants";
import { Loading, Error, PageHero } from "../components";
import { Link } from "react-router-dom";

const SingleItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    lists_loading: loading,
    lists_error: error,
    single_item: item,
    fetchSingleItem,
  } = useListsContext();

  useEffect(() => {
    fetchSingleItem(`${url}/${id}`);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const {
    image,
    price,
    description,
    size,
    street,
    zip,
    city,
    bedrooms,
    bathrooms,
    constructionYear,
  } = item;

  return (
    <section className="main">
      <PageHero title={city} item />
      <div className="section section-center page">
        <Link to="/" className="btn">
          back to Home
        </Link>
        <img src={image} />
        <div className="product-center">
          <h2>{street}</h2>

          <p>
            {zip}
            {city}
          </p>
          <p>{price}</p>
          <p>{size}</p>
          <p>built in {constructionYear}</p>

          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleItemPage;
