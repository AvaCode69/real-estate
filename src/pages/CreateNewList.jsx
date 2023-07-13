import React, { useState } from "react";

interface FormData {
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  streetName: string;
  houseNumber: string;
  numberAddition: string;
  zip: string;
  city: string;
  constructionYear: number;
  hasGarage: boolean;
  description: string;
}

const CreateNewList: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    streetName: "",
    houseNumber: "",
    numberAddition: "",
    zip: "",
    city: "",
    constructionYear: 0,
    hasGarage: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bedrooms:
        <input
          type="number"
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Bathrooms:
        <input
          type="number"
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Size:
        <input
          type="number"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Street Name:
        <input
          type="text"
          name="streetName"
          value={formData.streetName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        House Number:
        <input
          type="text"
          name="houseNumber"
          value={formData.houseNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number Addition:
        <input
          type="text"
          name="numberAddition"
          value={formData.numberAddition}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Zip:
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Construction Year:
        <input
          type="number"
          name="constructionYear"
          value={formData.constructionYear}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Has Garage:
        <input
          type="checkbox"
          name="hasGarage"
          checked={formData.hasGarage}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateNewList;
