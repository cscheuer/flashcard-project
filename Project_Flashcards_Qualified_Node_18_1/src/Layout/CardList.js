import React, { useEffect, useState } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

function CardList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState([{}]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(id, abortController.signal)
      .then((response) => {
        setDeck(response);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, [id]);

  const handleDelete = async (id, type) => {
    if (type === "deck") {
      const result = window.confirm(
        "Are you sure you want to delete this deck?"
      );
      if (result) {
        await deleteDeck(id);
        window.location = "/";
      }
    } else {
      const result = window.confirm(
        "Are you sure you want to delete this card?"
      );
      if (result) {
        await deleteCard(id);
        window.location.reload();
      }
    }
  };

  const list = Array.isArray(deck.cards)
    ? deck.cards.map((card) => (
        <div className="card" key={card.id}>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 card-col">
                <h5 className="card-title">Front</h5>
                <p>{card.front}</p>
              </div>
              <div className="col-sm-6 card-col">
                <h5 className="card-title">Back</h5>
                <p>{card.back}</p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary deck-button"
              onClick={() => navigate(`cards/${card.id}/edit`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger deck-button"
              onClick={() => handleDelete(card.id, "card")}
            >
              <i class="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>
      ))
    : null;

  if (error) {
    return <p>Error</p>;
  }

  const pageData = {
    page: "Card List",
    cardId: null,
    deckName: deck.name,
    deckId: deck.id,
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-sm-8 mb-3 mb-sm-0">
        <Breadcrumb pageData={pageData} />
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <button
          type="button"
          className="btn btn-secondary deck-button"
          onClick={() => navigate("edit")}
        >
          <i class="bi bi-pencil-square"></i> Edit
        </button>
        <button
          type="button"
          className="btn btn-primary deck-button"
          onClick={() => navigate("study")}
        >
          <i class="bi bi-journal-bookmark-fill"></i> Study
        </button>
        <button
          type="button"
          className="btn btn-primary deck-button"
          onClick={() => navigate("cards/new")}
        >
          <i class="bi bi-plus-lg"></i> Add Cards
        </button>
        <button
          type="button"
          className="btn btn-danger deck-button"
          onClick={() => handleDelete(id, "deck")}
        >
          <i class="bi bi-trash3-fill"></i>
        </button>
        <h3>Cards</h3>
        {list}
      </div>
    </div>
  );
}

export default CardList;
