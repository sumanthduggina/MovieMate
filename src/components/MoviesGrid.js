import React from "react";
import "../styles.css";
import { useState } from "react";
import MovieCard from "./MovieCard";
export default function MoviesGrid({ movies, watchlist, toggleWatchList }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All");

  const handleSeachChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const matchesGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchesSearchTerm = (movie, searchTerm) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie >= 8;
      case "OK":
        return movie.rating < 8 && movie.rating >= 5;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filterMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesSearchTerm(movie, searchTerm) &&
      matchesRating(movie, rating)
  );

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies"
        className="search-input"
        value={searchTerm}
        onChange={handleSeachChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genre</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantancy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            vlaue={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>OK</option>
            <option>Bad</option>
          </select>
        </div>
      </div>

      <div className="movies-grid">
        {filterMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isWatchListed={watchlist.includes(movie.id)}
            toggleWatchList={toggleWatchList}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}
