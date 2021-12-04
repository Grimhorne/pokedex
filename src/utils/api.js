import axios from "axios";

export const fetchPokemon = (id) =>
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
