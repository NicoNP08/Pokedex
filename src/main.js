import { getPokemons, getPokemonTypes, getPokemonUnit } from "./pokeApi";
import { create_Grid } from "./pokemon";
const pokeBoton = document.querySelector("#pokeBotonInit");
const pokeBurguir = document.querySelector(".close_btn");
const chekBoxList = document.querySelector("#checkTypeList");
const selector = document.querySelector("#Types_Selector");
const searchBarrita = document.querySelector(".input_Search");
const search_Btn = document.querySelector(".search_Icon");
const main_Contain = document.querySelector(".app");

function closeInitInterface() {
  const interfaceInit = document.querySelector(".initial_interfeis");
  //interfaceInit.classList.add("close");
  document.body.removeChild(interfaceInit);
}
function handleBurguir() {
  const navPrincipal = document.querySelector(".nav_main");
  const searchContainer = document.querySelector(".search_bar");
  searchContainer.classList.toggle("close");
  navPrincipal.classList.toggle("close");
}
function handleCheckBoxList(event) {
  selector.disabled = !selector.disabled;
}
function changeSearchType(event) {
  searchBarrita.value = event.target.value;
}
function searchPokemon(event) {
  let search_Value = searchBarrita.value;
  if (chekBoxList.checked) {
    getPokemonTypes(search_Value);
  } else {
    getPokemonUnit(search_Value);
  }
}
pokeBoton.addEventListener("click", closeInitInterface);

pokeBurguir.addEventListener("click", handleBurguir);

chekBoxList.addEventListener("click", handleCheckBoxList);
selector.addEventListener("change", changeSearchType);
search_Btn.addEventListener("click", searchPokemon);

// getPokemons();
// getPokemonUnit();
// getPokemonTypes();
//pokeCarga inicial
async function init() {
  const pokemons = await getPokemons();
  const poke_Grid = await create_Grid(pokemons.results);
  main_Contain.append(poke_Grid);
}
init();
