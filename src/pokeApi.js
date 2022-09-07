const enlaceBase = "https://pokeapi.co/api/v2";

async function getPokemons({ limit = 24, offset = 0 } = {}) {
  const pokemonsResponse = await fetch(
    `${enlaceBase}/pokemon/?limit=${limit}&offset=${offset} `
  );
  const pokemonosReales = await pokemonsResponse.json();
  return pokemonosReales;
}
async function getPokemonUnit(query = 1) {
  const pokeResponseUnit = await fetch(`${enlaceBase}/pokemon/${query}/`);
  const pokeRealUnit = await pokeResponseUnit.json();
  return pokeRealUnit;
}
async function getPokemonTypes(query = "normal") {
  query = pokemonTypesHinglich[query];
  const pokeResponseType = await fetch(`${enlaceBase}/type/${query}?limit=20`);
  const pokeRealType = await pokeResponseType.json();
  return pokeRealType;
}
const pokemonTypesHinglich = {
  Normal: "normal",
  Luchador: "fighting",
  Volador: "flying",
  Veneno: "poison",
  Tierra: "ground",
  Roca: "rock",
  Bicho: "bug",
  Fantasma: "ghost",
  Acero: "steel",
  Fuego: "fire",
  Agua: "water",
  Planta: "grass",
  Electrico: "electric",
  Psiquico: "psychic",
  Hielo: "ice",
  Dragon: "dragon",
  Siniestro: "dark",
  Hada: "fairy",
};
const pokemonTypesHespanich = Object.entries(pokemonTypesHinglich).reduce(
  (ret, entry) => {
    const [key, value] = entry;
    ret[value] = key;
    return ret;
  },
  {}
);

export {
  getPokemons,
  getPokemonTypes,
  getPokemonUnit,
  pokemonTypesHinglich,
  pokemonTypesHespanich,
};
