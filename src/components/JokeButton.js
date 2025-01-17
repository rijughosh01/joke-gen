import React from "react";

const JokeButton = ({ fetchJoke }) => {
  return <button onClick={fetchJoke}>Get a new joke</button>;
};

export default JokeButton;
