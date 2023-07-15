import React, { useState } from "react";
import axios from "axios";
import { post_url as url } from "../utils/constants";
import { useListsContext } from "../context/lists_context";

const AddItem = () => {
  // const { error } = useListsContext();
  const [error, setError] = useState("");

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
    images: [],
    constructionYear: "156",
    hasGarage: false,
    description: "fddf mkkdmk kmkm kme mm",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the input is a checkbox
    const inputValue = type === "checkbox" ? checked : value;

    // Trim whitespace from the input value if it's a string
    const trimmedValue =
      typeof inputValue === "string" ? inputValue.trim() : inputValue;

    // Check if the trimmed value is empty (only whitespace)
    const isEmpty = trimmedValue === "";

    setFormData((prevData) => ({
      ...prevData,
      [name]: isEmpty ? "" : trimmedValue,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, images: files }));
  };
  const isNotEmpty = (value) => {
    const trimmedValue = String(value).trim(); // Convert value to string and then trim
    return trimmedValue !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (
      !isNotEmpty(formData.price) ||
      !isNotEmpty(formData.bedrooms) ||
      !isNotEmpty(formData.description)
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNotEmpty) {
      try {
        const response = await axios.post(url, formData);

        if (response.status === 201) {
          console.log("Item added successfully");
          // Reset the form after successful submission
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
            hasGarage: false,
            description: "",
          });
        }
      } catch (error) {
        console.log("Error adding item:", error);
      }
    } else {
      setError("Form validation failed");
    }
  };

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
          />
        </label>
        <label>
          Bedrooms:
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="text"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </label>
        <label>
          Street Name:
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
          />
        </label>
        <label>
          House Number:
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Number Addition:
          <input
            type="text"
            name="numberAddition"
            value={formData.numberAddition}
            onChange={handleChange}
          />
        </label>
        <label>
          ZIP:
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
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
          />
        </label>
        <label>
          Has Garage:
          <input
            type="checkbox"
            name="hasGarage"
            checked={formData.hasGarage}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                hasGarage: e.target.checked,
              }))
            }
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">Send Post</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  );
};

export default AddItem;
