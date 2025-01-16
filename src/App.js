import React, { useState } from "react";
import Joke from "./components/Joke";
import JokeButton from "./components/JokeButton";
import "./index.css";

const App = () => {
  const [joke, setJoke] = useState("Click the button to fetch a joke!");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching the joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
    setLoading(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <h1>Joke Generator</h1>
      {loading ? <div className="loader"></div> : <Joke joke={joke} />}
      <div className="button-container">
        <JokeButton fetchJoke={fetchJoke} />
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? " Light Mode" : " Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default App;
