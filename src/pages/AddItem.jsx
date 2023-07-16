import React, { useContext, useState } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";

const AddItem = () => {
  const { setFormData, formData, validateForm, invalidFields } =
    useListsContext();
  const [message, setMessage] = useState("");

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(url, formData);

      if (response.status === 201) {
        setMessage("Item added successfully");
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
          images: [],
          constructionYear: "",
          hasGarage: "no",
          description: "",
        });
      }
    } catch (error) {
      console.log("Error adding item:", error);
    }
  };

  const getFieldClassName = (fieldName) =>
    invalidFields.includes(fieldName) ? "invalid" : "";

  return (
    <section className="main">
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
        <label>
          Upload Images:
          <input
            type="file"
            name="images"
            multiple
            accept="image/jpeg, image/png"
            onChange={handleImageChange}
          />
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
        {message && <p className="error">{message}</p>}
      </form>
    </section>
  );
};

export default AddItem;
