import React from "react";

const FavoriteJokes = ({ favorites, removeFavorite }) => {
  return (
    <div className="favorite-jokes">
      <h2>Favorite Jokes</h2>
      <ul>
        {favorites.map((joke, index) => (
          <li key={index}>
            {joke}
            <button
              onClick={() => removeFavorite(index)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteJokes;
