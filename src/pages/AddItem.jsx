import React, { useContext, useState } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components";

const AddItem = () => {
  const {
    setFormData,
    formData,
    validateForm,
    invalidFields,
    fetchLists,
    addToList,
    imageURLs,
    setImageURLs,
    addMessage,
    single_item,
  } = useListsContext();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? (checked ? "yes" : "no") : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, images: files }));

    const urls = files.map((file) => URL.createObjectURL(file));
    setImageURLs(urls);
  };
  const handleImageRemove = (index) => {
    const updatedURLs = [...imageURLs];

    updatedURLs.splice(index, 1);

    setImageURLs(updatedURLs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    addToList();
    if (!validateForm()) {
      setMessage("required field missing");
      return;
    }
    navigate(`/${single_item.id}`);
  };

  const getFieldClassName = (fieldName) =>
    invalidFields.includes(fieldName) ? "invalid" : "";

  return (
    <div className="aa">
      <section className="container">
        <div className="wrap">
          <form className="house-form" onSubmit={handleSubmit}>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={getFieldClassName("price")}
              />
            </label>
            <label>
              Bedrooms:
              <input
                type="text"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={getFieldClassName("bedrooms")}
              />
            </label>
            <label>
              Bathrooms:
              <input
                type="text"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={getFieldClassName("bathrooms")}
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className={getFieldClassName("size")}
              />
            </label>
            <label>
              Street Name:
              <input
                type="text"
                name="streetName"
                value={formData.streetName}
                onChange={handleChange}
                className={getFieldClassName("streetName")}
              />
            </label>
            <label>
              House Number:
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                className={getFieldClassName("houseNumber")}
              />
            </label>
            <label>
              Number Addition:
              <input
                type="text"
                name="numberAddition"
                value={formData.numberAddition}
                onChange={handleChange}
                className={getFieldClassName("numberAddition")}
              />
            </label>
            <label>
              ZIP:
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={getFieldClassName("zip")}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={getFieldClassName("city")}
              />
            </label>
            <label className="upload-label">
              Upload Images:
              <div className="upload-container">
                <div className="upload-preview">
                  {imageURLs.length > 0 && (
                    <div className="image-preview">
                      {imageURLs.map((url, index) => (
                        <div key={index} className="image-item">
                          <img src={url} alt={`Image ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => handleImageRemove(index)}
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    className="upload-input"
                  />

                  <div
                    className={`upload-icon-container ${
                      imageURLs.length > 0 ? "hidden" : ""
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
                value={formData.constructionYear}
                onChange={handleChange}
                className={getFieldClassName("constructionYear")}
              />
            </label>
            <label>
              Has Garage:
              <select
                name="hasGarage"
                value={formData.hasGarage}
                onChange={handleChange}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={getFieldClassName("description")}
              ></textarea>
            </label>
            <button type="submit">Send Post</button>
            {addMessage && <p className="message">{addMessage}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddItem;
