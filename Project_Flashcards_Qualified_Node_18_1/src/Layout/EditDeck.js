import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function EditDeck() {
  const { id } = useParams();
  const [deck, setDeck] = useState([{}]);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();
  const initialFormState = {
    id: "",
    name: "",
    description: "",
    cards: [],
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
    updateDeck(formData);
    window.location = `/decks/${id}`;
  };

  const handleCancel = () => {
    navigate(`/decks/${id}`);
  };

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(id, abortController.signal)
      .then((response) => {
        setDeck(response);
      })
      .catch((error) => {
        setError(error);
      });
  }, [id]);

  useEffect(() => {
    if (deck) {
      setFormData({
        id: deck.id,
        name: deck.name,
        description: deck.description,
        cards: deck.cards,
      });
    }
  }, [deck]);

  if (error) {
    return <p>Error</p>;
  }

  const pageData = {
    page: "Edit Deck",
    cardId: null,
    deckName: deck.name,
    deckId: deck.id,
  };

  return (
    <div>
      <Breadcrumb pageData={pageData} />
      <h2>Edit Deck</h2>
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

export default EditDeck;
