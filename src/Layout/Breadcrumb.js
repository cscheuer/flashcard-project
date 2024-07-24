import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ pageData }) {
  const { page, deckName, deckId, cardId } = pageData;
  switch (page) {
    case "Add Card":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item active">Add Card</li>
        </ol>
      );
    case "Create Deck":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      );
    case "Card List":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item active">{deckName}</li>
        </ol>
      );
    case "Study":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active">Study</li>
        </ol>
      );
    case "Edit Deck":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Deck</li>
        </ol>
      );
    case "Edit Card":
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">{<i class="bi bi-house-door-fill"></i>} Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active">Edit Card {cardId}</li>
        </ol>
      );
    default:
      return null;
  }
}

export default Breadcrumb;
