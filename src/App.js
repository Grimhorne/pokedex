import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPokemon, selectPokemon } from "./reducers/pokemonSlice";

import { fetchPokemon } from "./utils/api";

import "normalize.css";
import "./styles.scss";

export default function App() {
  const [pokemonNumber, setPokemonNumber] = useState(1);
  const [pokemonData, setPokemonData] = useState();

  const [pokemonImage, setPokemonImage] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
  );
  const [pokemonName, setPokemonName] = useState("Bulbasaur");
  const [pokemonTypes, setPokemonTypes] = useState(["grass", "poison"]);
  const [pokemonHeight, setPokemonHeight] = useState(7);
  const [pokemonWeight, setPokemonWeight] = useState(69);

  const selectedPokemon = useSelector(selectPokemon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPokemon[pokemonNumber]) {
      console.info(`use redux: ${pokemonNumber}`);
      return setPokemonData(selectedPokemon[pokemonNumber]);
    }

    const doFetchPokemon = async () => {
      const { data } = await fetchPokemon(pokemonNumber);
      console.info(`fetch from api: ${pokemonNumber}`);
      dispatch(setPokemon(data));
    };

    doFetchPokemon();
  }, [selectedPokemon, pokemonNumber]);

  useEffect(() => {
    if (!pokemonData) return;
    setPokemonName(pokemonData.name);
    setPokemonTypes(
      pokemonData.types.map((item) => {
        return item.type.name;
      })
    );
    setPokemonHeight(pokemonData.height);
    setPokemonWeight(pokemonData.weight);
    setPokemonImage(
      pokemonData.sprites.other["official-artwork"].front_default
    );
  }, [pokemonData]);

  function _getPokemon(pokeNo) {
    setPokemonNumber(pokeNo);
  }

  function _goPrevious() {
    const num = pokemonNumber - 1;
    if (num > 0) return _getPokemon(num);
  }

  function _goNext() {
    const num = pokemonNumber + 1;
    if (num <= 151) return _getPokemon(num);
  }

  function _goFirst() {
    return _getPokemon(1);
  }

  function _goLast() {
    return _getPokemon(151);
  }

  return (
    <div className="App">
      <div className="image">
        <img src={pokemonImage} alt={pokemonName} />
      </div>
      <div className="info">
        <div className="data">
          <table>
            <tbody>
              <tr className="name">
                <th>No {pokemonNumber}</th>
                <td>{pokemonName}</td>
              </tr>
              <tr className="types">
                <th>Type</th>
                <td>
                  <ul>
                    {pokemonTypes.map((i) => {
                      return <li key={i}>{i}</li>;
                    })}
                  </ul>
                </td>
              </tr>
              <tr className="height">
                <th>Height</th>
                <td>{pokemonHeight} dm</td>
              </tr>
              <tr className="weight">
                <th>Weight</th>
                <td>{pokemonWeight} hg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="actions">
          <div>
            <button
              type="button"
              onClick={_goFirst}
              disabled={pokemonNumber === 1}
            >
              first
            </button>
            <button
              type="button"
              onClick={_goPrevious}
              disabled={pokemonNumber - 1 < 1}
            >
              previous
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={_goNext}
              disabled={pokemonNumber + 1 > 151}
            >
              next
            </button>
            <button
              type="button"
              onClick={_goLast}
              disabled={pokemonNumber === 151}
            >
              last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
