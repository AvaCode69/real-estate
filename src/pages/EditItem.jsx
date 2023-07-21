//EditItem.jsx
import React, { useEffect } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";

const EditItem = () => {
  const {
    setFormData,
    formData,
    validateForm,
    invalidFields,
    fetchSingleItem,
    addToList,
    imageURL,
    setImageURL,
    setAddItemMessage,
    addItemMessage,
    single_item,
    edit_item,
  } = useListsContext();

  const {
    image,
    price,
    description,
    size,
    streetName,
    houseNumber,
    numberAddition,
    hasGarage,
    zip,
    city,
    bedrooms,
    bathrooms,
    constructionYear,
  } = edit_item;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSingleItem(`${url}/${single_item.id}`);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));

    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setAddItemMessage("Required field(s) missing");
      return;
    }

    try {
      // Send the updated item data to the server using an HTTP PUT or PATCH request
      await addToList(formData);
      navigate(`/`);
    } catch (error) {
      // Handle any errors that occur during the update
      console.error("Error updating item:", error);
    }
  };

  const getFieldClassName = (fieldName) =>
    invalidFields.includes(fieldName) ? "invalid" : "";

  return (
    <section className="container">
      <div className="wrap">
        <form className="house-form" onSubmit={handleSubmit}>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={price}
              onChange={handleChange}
              className={getFieldClassName("price")}
            />
          </label>
          <label>
            Bedrooms:
            <input
              type="text"
              name="bedrooms"
              value={bedrooms}
              onChange={handleChange}
              className={getFieldClassName("bedrooms")}
            />
          </label>
          <label>
            Bathrooms:
            <input
              type="text"
              name="bathrooms"
              value={bathrooms}
              onChange={handleChange}
              className={getFieldClassName("bathrooms")}
            />
          </label>
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={size}
              onChange={handleChange}
              className={getFieldClassName("size")}
            />
          </label>
          <label>
            Street Name:
            <input
              type="text"
              name="streetName"
              value={streetName}
              onChange={handleChange}
              className={getFieldClassName("streetName")}
            />
          </label>
          <label>
            House Number:
            <input
              type="text"
              name="houseNumber"
              value={houseNumber}
              onChange={handleChange}
              className={getFieldClassName("houseNumber")}
            />
          </label>
          <label>
            Number Addition:
            <input
              type="text"
              name="numberAddition"
              value={numberAddition}
              onChange={handleChange}
              className={getFieldClassName("numberAddition")}
            />
          </label>
          <label>
            ZIP:
            <input
              type="text"
              name="zip"
              value={zip}
              onChange={handleChange}
              className={getFieldClassName("zip")}
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
              className={getFieldClassName("city")}
            />
          </label>
          <label className="upload-label">
            Upload Images:
            <div className={`upload-container ${getFieldClassName("image")}`}>
              <div className="upload-preview">
                {imageURL && (
                  <div className="image-preview">
                    <div className="image-item">
                      <img src={imageURL} alt="Image Preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setImageURL("");
                          formData.image = "";
                        }}
                      >
                        <FiX />
                      </button>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  multiple
                  accept="image/jpeg, image/png"
                  onChange={(e) => {
                    handleImageChange(e);
                    handleChange(e);
                  }}
                  className="upload-input"
                />

                <div
                  className={`upload-icon-container ${
                    imageURL.length > 0 ? "hidden" : ""
                  }`}
                >
                  <FiPlus className="upload-icon" />
                </div>
              </div>
            </div>
          </label>
          <label>
            Construction Year:
            <input
              type="text"
              name="constructionYear"
              value={constructionYear}
              onChange={handleChange}
              className={getFieldClassName("constructionYear")}
            />
          </label>
          <label>
            Has Garage:
            <select name="hasGarage" value={hasGarage} onChange={handleChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              className={getFieldClassName("description")}
            ></textarea>
          </label>
          <button type="submit">update Post</button>
          {addItemMessage && <p className="message">{addItemMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditItem;
