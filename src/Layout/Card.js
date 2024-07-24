import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function Card() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});
  const [currentCard, setCurrentCard] = useState(0);
  const [error, setError] = useState(undefined);
  const [flipped, setFlipped] = useState(false);

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

  useEffect(() => {
    const abortController = new AbortController();

    if (deck.cards && deck.cards.length > 0) {
      setCards(deck.cards);
    }
    return () => abortController.abort();
  }, [deck.cards]);

  useEffect(() => {
    const abortController = new AbortController();

    if (cards && cards.length > 0) {
      readCard(cards[currentCard].id, abortController.signal)
        .then((response) => {
          setCard(response);
        })
        .catch((error) => {
          setError(error);
        });
    }
    return () => abortController.abort();
  }, [cards, currentCard]);

  const handleFlipCard = (event) => {
    event.preventDefault();
    setFlipped(!flipped);
  };

  const handleNext = (event) => {
    event.preventDefault();
    setFlipped(false);
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else if (currentCard === cards.length - 1) {
      const restart = window.confirm("Restart this deck?");
      if (restart) {
        setCurrentCard(0);
      } else {
        navigate("/");
      }
    }
  };

  const pageData = {
    page: "Study",
    cardId: card.id,
    deckName: deck.name,
    deckId: deck.id,
  };

  if (error) {
    return <p>{`${error}`}</p>;
  }

  if (cards.length >= 3) {
    return (
      <div className="row justify-content-md-center">
        <div className="col-sm-8 mb-3 mb-sm-0">
          <Breadcrumb pageData={pageData} />
          <h2>Study: {deck.name}</h2>
          <div>
            <h4>
              Card {currentCard + 1} of {cards.length}
            </h4>
            <p>{`${flipped ? card.back : card.front}`}</p>
            <button
              type="button"
              class="btn btn-secondary deck-button"
              onClick={handleFlipCard}
            >
              Flip
            </button>
            {flipped ? (
              <button
                type="button"
                class="btn btn-secondary deck-button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-md-center">
      <div className="col-sm-8 mb-3 mb-sm-0">
        <Breadcrumb pageData={pageData} />
        <h2>Study: {deck.name}</h2>
        <div>
          <h4>Not enough cards</h4>
          <p>
            You need at least 3 cards to study. There{" "}
            {cards.length === 1
              ? ` is 1 card in this deck.`
              : ` are ${cards.length} cards in this deck.`}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/decks/${id}/cards/new`)}
          >
            <i className="bi bi-plus-lg"></i> Add Cards
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
