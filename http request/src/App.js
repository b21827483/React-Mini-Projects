import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovieList = () => {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fetchedMovies = data.results.map((movie) => ({
          id: movie.epidose,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        }));
        setMovies(fetchedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieList}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
