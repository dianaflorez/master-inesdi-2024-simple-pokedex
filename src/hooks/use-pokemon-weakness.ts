import { useState, useEffect } from 'react';

interface PokemonType {
  name: string;
  url: string;
}

interface TypeDetail {
  damage_relations: {
    double_damage_from: PokemonType[];
  };
}

export function usePokemonWeaknesses (pokemonName: string) {
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonWeaknesses = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = await response.json();
        const types = pokemonData.types.map((type: any) => type.type.name);

        const typeResponses = await Promise.all(types.map((type: string) => fetch(`https://pokeapi.co/api/v2/type/${type}`)));
        const typeDetails = await Promise.all(typeResponses.map((response) => response.json()));

        const weaknessSet = new Set<string>();
        typeDetails.forEach((detail: TypeDetail) => {
          detail.damage_relations.double_damage_from.forEach((type: PokemonType) => weaknessSet.add(type.name));
        });

        setWeaknesses(Array.from(weaknessSet));
      } catch (error) {
        console.error('Error al obtener debilidades del Pokémon:', error);
      }
    };

    fetchPokemonWeaknesses();
  }, [pokemonName]);

  return weaknesses;
}