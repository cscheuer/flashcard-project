import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

function CreateDeck() {
  const navigate = useNavigate();
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData({ ...initialFormState });
    window.location = "/";
  };
  const handleCancel = () => {
    navigate("/");
  };

  const pageData = {
    page: "Create Deck",
    cardId: null,
    deckName: null,
    deckId: null,
  };

  return (
    <div>
      <Breadcrumb pageData={pageData} />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit} name="create">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            name="name"
            className="form-control"
            placeholder="Deck name"
            required={true}
            onChange={handleChange}
            value={formData.name}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            placeholder="Brief description of the deck"
            required={true}
            onChange={handleChange}
            value={formData.description}
          ></textarea>
        </div>
        <button type="button" className="btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
