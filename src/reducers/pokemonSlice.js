import { createSlice } from "@reduxjs/toolkit";
import { resetToInitialState } from "./common-actions";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {},
  reducers: {
    setPokemon: (state, action) => {
      if (!state) {
        state = {};
      }

      const { id } = action.payload;
      state[id] = action.payload;
      return state;
    },
    resetPokemon: () => {
      return {};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(resetToInitialState, () => {
      return {};
    });
  }
});

export const { setPokemon, resetPokemon } = pokemonSlice.actions;

export const selectPokemon = (state) => state.pokemon;

export default pokemonSlice.reducer;
