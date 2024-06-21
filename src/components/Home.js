import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Results from "./Results";
import Navigation from "./Navigation";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  return (
    <div className="Home">
      <Navigation onSearch={handleSearchResults} query={query} />

      <main>
        {searchResults.length > 0 && (
          <Results data={searchResults} keyword={query} />
        )}
      </main>
    </div>
  );
}
