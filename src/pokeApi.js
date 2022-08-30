const enlaceBase = "https://pokeapi.co/api/v2";

async function getPokemons() {
  const pokemonsResponse = await fetch(`${enlaceBase}/pokemon/?limit=200`);
  const pokemonosReales = await pokemonsResponse.json();
  console.log(pokemonosReales);
}
async function getPokemonUnit(query = 1) {
  const pokeResponseUnit = await fetch(`${enlaceBase}/pokemon/${query}/`);
  const pokeRealUnit = await pokeResponseUnit.json();
  console.log(pokeRealUnit);
}
async function getPokemonTypes() {
  const pokeResponseType = await fetch(`${enlaceBase}/type/1`);
  const pokeRealType = await pokeResponseType.json();
  console.log(pokeRealType);
}
export { getPokemons, getPokemonTypes, getPokemonUnit };
