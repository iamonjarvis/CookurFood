import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchPage from "./Pages/Searchpage";
import DetailedRecipePage from "./Pages/DetailedRecipePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:query" element={<SearchPage />} />
          <Route path="/recipe/:id" element={<DetailedRecipePage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
