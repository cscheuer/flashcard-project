import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { useNavigate } from "react-router-dom";
import { listDecks } from "../utils/api";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then((response) => {
        setDecks(response);
      })
      .catch((error) => {
        setError(error);
      });

    return () => abortController.abort();
  }, []);

  const list = Array.isArray(decks)
    ? decks.map((deck) => (
        <Deck
          key={deck.id}
          id={deck.id}
          deckName={deck.name}
          deckDescription={deck.description}
          length={deck.cards.length}
        />
      ))
    : null;

  const navigate = useNavigate();

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <div className="row justify-content-md-center">
        <div className="col-sm-8 mb-3 mb-sm-0">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/decks/new")}
          >
            <i className="bi bi-plus-lg"></i> Create Deck
          </button>
        </div>
      </div>
      {list}
    </div>
  );
}

export default DeckList;
