import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";

function EditCard() {
  const { id, cardId } = useParams();
  const [deck, setDeck] = useState([{}]);
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();
  const initialFormState = {
    front: "",
    back: "",
    deckId: "",
    id: "",
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
    updateCard(formData);
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
    const abortController = new AbortController();
    if (deck.cards && deck.cards.length > 0) {
      readCard(cardId, abortController.signal)
        .then((response) => {
          setCard(response);
        })
        .catch((error) => {
          setError(error);
        });
    }
    return () => abortController.abort();
  }, [cardId, deck.cards]);

  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front,
        back: card.back,
        deckId: deck.id,
        id: card.id,
      });
    }
  }, [card, deck.id]);

  if (error) {
    return <p>Error</p>;
  }

  const pageData = {
    page: "Edit Card",
    cardId: card.id,
    deckName: deck.name,
    deckId: deck.id,
  };

  return (
    <div>
      <Breadcrumb pageData={pageData} />
      <h2>{deck.name}: Edit Card</h2>
      <CardForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        formData={formData}
      />
    </div>
  );
}

export default EditCard;
