import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ id, deckName, deckDescription, length }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`decks/${id}`);
  };

  const handleStudy = () => {
    navigate(`decks/${id}/study`);
  };

  const handleDelete = async (id) => {
    const result = window.confirm("Are you sure you want to delete this deck?");
    if (result) {
      await deleteDeck(id);
      window.location.reload();
    }
  };
  return (
    <div className="row justify-content-md-center">
      <div className="col-sm-8 mb-3 mb-sm-0">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{deckName}</h5>
            <p className="card-text">{deckDescription} </p>
            <button
              type="button"
              className="btn btn-secondary deck-button"
              onClick={handleView}
            >
              <i className="bi bi-eye-fill"></i> View
            </button>
            <button
              type="button"
              className="btn btn-primary deck-button"
              onClick={handleStudy}
            >
              <i className="bi bi-journal-bookmark-fill"></i> Study
            </button>
            <button
              type="button"
              className="btn btn-danger deck-button"
              onClick={() => handleDelete(id)}
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
          <div class="card-footer text-body-secondary text-center">
            {length} {length === 1 ? "card" : "cards"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deck;
