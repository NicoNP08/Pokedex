const enlaceBase = "https://pokeapi.co/api/v2";

async function getPokemons() {
  const pokemonsResponse = await fetch(`${enlaceBase}/pokemon/?limit=20`);
  const pokemonosReales = await pokemonsResponse.json();
  return pokemonosReales;
}
async function getPokemonUnit(query = 1) {
  const pokeResponseUnit = await fetch(`${enlaceBase}/pokemon/${query}/`);
  const pokeRealUnit = await pokeResponseUnit.json();
  return pokeRealUnit;
}
async function getPokemonTypes(query = "normal") {
  query = pokemonTypes[query];
  const pokeResponseType = await fetch(`${enlaceBase}/type/${query}`);
  const pokeRealType = await pokeResponseType.json();
  console.log(pokeRealType);
}
const pokemonTypes = {
  Normal: "normal",
  Lucha: "fighting",
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
export { getPokemons, getPokemonTypes, getPokemonUnit };
