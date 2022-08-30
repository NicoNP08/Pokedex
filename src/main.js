import { getPokemons, getPokemonTypes, getPokemonUnit } from "./pokeApi";
const pokeBoton = document.querySelector("#pokeBotonInit");
const pokeNumber = "mudkip";
function closeInitInterface() {
  const interfaceInit = document.querySelector(".initial_interfeis");
  //interfaceInit.classList.add("close");
  document.body.removeChild(interfaceInit);
}
pokeBoton.addEventListener("click", closeInitInterface);
getPokemons();
getPokemonUnit();
getPokemonTypes();
