import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Layout/NotFound";
import AddCard from "./Layout/AddCard";
import Card from "./Layout/Card";
import CardList from "./Layout/CardList";
import CreateDeck from "./Layout/CreateDeck";
import DeckList from "./Layout/DeckList";
import EditCard from "./Layout/EditCard";
import EditDeck from "./Layout/EditDeck";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DeckList />} />
      <Route path="/decks/new" element={<CreateDeck />} />
      <Route path="/decks/:id/cards/new" element={<AddCard />} />
      <Route path="/decks/:id/study" element={<Card />} />
      <Route path="/decks/:id/edit" element={<EditDeck />} />
      <Route path="/decks/:id/cards/:cardId/edit" element={<EditCard />} />
      <Route path="/decks/:id" element={<CardList />}>
        <Route path="study" element={<Card />} />
        <Route path="cards/*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
