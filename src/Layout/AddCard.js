import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

function AddCard() {
  const { id } = useParams();
  const [deck, setDeck] = useState([{}]);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();
  const initialFormState = {
    front: "",
    back: "",
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
    createCard(id, formData);
    setFormData({ ...initialFormState });
    window.location = `/decks/${id}`;
  };
  const handleCancel = () => {
    navigate(-1);
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

  if (error) {
    return <p>Error</p>;
  }

  const pageData = {
    page: "Add Card",
    cardId: null,
    deckName: null,
    deckId: null,
  };

  return (
    <div>
      <Breadcrumb pageData={pageData} />
      <h2>{deck.name}</h2>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        formData={formData}
      />
    </div>
  );
}

export default AddCard;
