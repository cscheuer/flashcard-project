import React from "react";

function CardForm({ handleChange, handleSubmit, handleCancel, formData }) {
  return (
    <form onSubmit={handleSubmit} name="create">
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          placeholder="Front side of card"
          required={true}
          onChange={handleChange}
          value={formData.front}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back
        </label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          placeholder="Back side of card"
          required={true}
          onChange={handleChange}
          value={formData.back}
        ></textarea>
      </div>
      <button type="button" className="btn" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
