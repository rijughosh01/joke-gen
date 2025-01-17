import React, { useEffect } from "react";
import Joke from "./components/Joke";
import JokeButton from "./components/JokeButton";
import FavoriteJokes from "./components/FavoriteJokes";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import {
  setJoke,
  setFavorites,
  addFavorite,
  removeFavorite,
  toggleDarkMode,
  setCategory,
  setLoading,
} from "./redux/jokeSlice";
import "./index.css";

const App = () => {
  const joke = useSelector((state) => state.joke.joke);
  const favorites = useSelector((state) => state.joke.favorites);
  const darkMode = useSelector((state) => state.joke.darkMode);
  const category = useSelector((state) => state.joke.category);
  const loading = useSelector((state) => state.joke.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    dispatch(setFavorites(savedFavorites));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchJoke = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/random`
      );
      const data = await response.json();
      dispatch(setJoke(`${data.setup} - ${data.punchline}`));
    } catch (error) {
      console.error("Error fetching the joke:", error);
      dispatch(setJoke("Failed to fetch joke. Please try again."));
    }
    dispatch(setLoading(false));
  };

  const saveFavorite = () => {
    if (!favorites.includes(joke)) {
      dispatch(addFavorite(joke));
    }
  };

  const handleRemoveFavorite = (index) => {
    dispatch(removeFavorite(index));
  };

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <h1>Joke Generator</h1>
        <div className="category-selector">
          <label htmlFor="category">Choose a category: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="general">General</option>
            <option value="programming">Programming</option>
          </select>
        </div>
        {loading ? <div className="loader"></div> : <Joke joke={joke} />}
        <div className="button-container">
          <JokeButton fetchJoke={fetchJoke} />
          <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button className="save-favorite" onClick={saveFavorite}>
            Favorite
          </button>
        </div>
        <div className="share-buttons">
          <FacebookShareButton url={window.location.href} quote={joke}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={joke}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <FavoriteJokes
          favorites={favorites}
          removeFavorite={handleRemoveFavorite}
        />
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
