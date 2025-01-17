import { createSlice } from "@reduxjs/toolkit";

export const jokeSlice = createSlice({
  name: "joke",
  initialState: {
    joke: "Click the button to fetch a joke!",
    favorites: [],
    darkMode: false,
    category: "general",
    loading: false,
  },
  reducers: {
    setJoke: (state, action) => {
      state.joke = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (_, index) => index !== action.payload
      );
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setJoke,
  setFavorites,
  addFavorite,
  removeFavorite,
  toggleDarkMode,
  setCategory,
  setLoading,
} = jokeSlice.actions;

export default jokeSlice.reducer;
