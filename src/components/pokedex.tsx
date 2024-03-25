import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition, usePokemonWeaknesses } from "hooks";
import { useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import "./pokedex.css";

interface Pokemon {
  id: number;
  name: string;
  sprites: string;
}


export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);
  console.log(pokemonList[i])
  const weaknesses  = usePokemonWeaknesses(pokemonList[i]?.name);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'grass':
          return '🌿';
      case 'fire':
          return '🔥';
      case 'water':
          return '💧';
      case 'poison':
          return '💀';
      case 'normal': 
          return '🐾';
      case 'electric': 
          return '⚡️';
      case 'bug':
          return '🐞';
      case 'ice': 
          return '❄️';
      case 'fighting': 
          return '👊';
      case 'ground': 
          return '🏜️';
      case 'flying': 
          return '🕊️';
      case 'psychic': 
          return '🔮';
      case 'rock': 
          return '🐾';
      case 'ghost': 
          return '👻';
      case 'dragon': 
          return '🐉';
      case 'dark': 
          return '🌑';
      case 'steel': 
          return '🛡️';
      case 'fairy': 
          return '🧚';
      default:
          return '🐾';
    }
  };

  const [pokeballs, setPokeballs] = useState<Array<Pokemon | null>>(Array(6).fill(null));

  const handlePokemonSelect = (pokemon: Pokemon) => {
    const pokeballIndex = pokeballs.findIndex(ball => ball === null);
    if (pokeballIndex !== -1) {
      const updatedPokeballs = [...pokeballs];
      updatedPokeballs[pokeballIndex] = pokemon;
      setPokeballs(updatedPokeballs);
    }
  };
  
  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        
        <div className="pokedex-mini">
          <div className="panel-img left-panel-img">
            <div className="screen main-screen">
              {selectedPokemon && (
                <img
                  className={c(
                    "sprite",
                    "obfuscated",
                    ready && "ready",
                    ready && `ready--${randomMode()}`
                  )}
                  src={selectedPokemon.sprites.front_default}
                  alt={selectedPokemon.name}
                  onClick={() => handlePokemonSelect(selectedPokemon)}
                />
              )}
            </div>
            *** Click en la imagen para seleccionarla
          </div>

          <div className="panel-weakness right-panel">
            <div className="screen-wek name-display-wek">
              <div>
                <strong>Weaknesses:</strong>
                {weaknesses?.map((weakness, index) => (
                  <div key={index}>
                    {getTypeIcon(weakness.toLowerCase())}
                    {weakness}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>

        <div className="screen name-display">
          <p>Types:</p>
          <div>
            {selectedPokemon?.types.map((typeData, index) => (
              <span key={index}>
                {typeData.type.name.toLowerCase()}
                {getTypeIcon(typeData.type.name.toLowerCase())},
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>

        
        <div className="pokeballs-container">
          {pokeballs.map((pokemon, index) => (
            <div key={index} style={{ display: 'inline-block', margin: '0px' }}>
              {pokemon ? (
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              ) : (
                <img src="https://purepng.com/public/uploads/large/purepng.com-pokeballpokeballdevicepokemon-ballpokemon-capture-ball-1701527825716o2adc.png" alt="Pokeball" />
              )}
            </div>
          ))}
        </div>


        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}
