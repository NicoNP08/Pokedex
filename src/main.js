import { getPokemons, getPokemonTypes, getPokemonUnit } from "./pokeApi";
import { create_Grid, create_Type_Grid, create_Unit_Grid } from "./pokemon";
const pokeBoton = document.querySelector("#pokeBotonInit");
const pokeBurguir = document.querySelector(".close_btn");
const chekBoxList = document.querySelector("#checkTypeList");
const selector = document.querySelector("#Types_Selector");
const searchBarrita = document.querySelector(".input_Search");
const search_Btn = document.querySelector(".search_Icon");
const main_Contain = document.querySelector(".app");
let search_Value = "";

function closeInitInterface() {
  const interfaceInit = document.querySelector(".initial_interfeis");
  document.body.removeChild(interfaceInit);
}
function createSpinner() {
  const carga_contain = document.createElement("div");
  const carga = document.createElement("div");
  carga_contain.classList.add("spinner_contain");
  carga.classList.add("spinner");
  carga_contain.append(carga);
  return carga_contain;
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
async function reload_Grid(poke_Array, type = "general") {
  const actual_Grid = document.querySelector("#pokeGrid");
  main_Contain.removeChild(actual_Grid);
  const spinner = createSpinner();
  main_Contain.append(spinner);
  let poke_Grid;
  if (type === "types") {
    poke_Grid = await create_Type_Grid(poke_Array);
  } else if (type === "general") {
    poke_Grid = await create_Grid(poke_Array.results);
  } else {
    poke_Grid = create_Unit_Grid(poke_Array);
  }

  main_Contain.removeChild(spinner);
  main_Contain.append(poke_Grid);
}
async function searchPokemon(event) {
  search_Value = searchBarrita.value;
  if (search_Value.length <= 0) {
    const btn_Un = resetBtns();
    reload_Basic();
    return;
  }
  if (chekBoxList.checked) {
    init_Types();
  } else {
    init_Unit();
  }
}

pokeBoton.addEventListener("click", closeInitInterface);
pokeBurguir.addEventListener("click", handleBurguir);
chekBoxList.addEventListener("click", handleCheckBoxList);
selector.addEventListener("change", changeSearchType);
search_Btn.addEventListener("click", searchPokemon);

async function limit_Page({ limit, offset, btn }) {
  const page_Btns = resetBtns();

  const poke_Array = await getPokemons({ limit, offset });

  await reload_Grid(poke_Array);
  let new_Btns;
  if (btn === "next") {
    new_Btns = create_Page({
      actual_Page: parseInt(page_Btns.dataset.actualPage) + 1,
    });
  } else {
    new_Btns = create_Page({
      actual_Page: parseInt(page_Btns.dataset.actualPage) - 1,
    });
  }
  main_Contain.append(new_Btns);
}

async function limit_Page_Types({ limit, offset, btn }) {
  const page_Btns = resetBtns();
  const poke_Types = await getPokemonTypes(search_Value);
  let poke_Array = poke_Types.pokemon.slice(offset, limit);
  let last_Page = false;
  if (poke_Array.length < 24) {
    last_Page = true;
  }
  await reload_Grid(poke_Array, "types");
  let new_Btns;
  if (btn === "next") {
    new_Btns = create_Page_Types({
      actual_Page: parseInt(page_Btns.dataset.actualPage) + 1,
      last_Page,
    });
  } else {
    new_Btns = create_Page_Types({
      actual_Page: parseInt(page_Btns.dataset.actualPage) - 1,
      last_Page,
    });
  }
  main_Contain.append(new_Btns);
}

function create_Page({ actual_Page = 1 }) {
  const page_Container = document.createElement("div");
  page_Container.dataset.actualPage = actual_Page;
  page_Container.id = "Btns_Page_Btns";
  const btn_prev = document.createElement("button");
  const btn_next = document.createElement("button");
  btn_prev.textContent = "Anterior";
  btn_next.textContent = "Siguiente";
  btn_prev.classList.add("style_Btn");
  btn_next.classList.add("style_Btn");

  if (actual_Page === 1) {
    btn_prev.disabled = true;
  }

  const basicNumber = 24;

  btn_next.addEventListener("click", () => {
    limit_Page({
      limit: basicNumber,
      offset: basicNumber * actual_Page,
      btn: "next",
    });
  });
  btn_prev.addEventListener("click", () => {
    const offsetValue = (actual_Page - 1) * basicNumber - basicNumber;
    limit_Page({
      limit: 24,
      offset: offsetValue,
      btn: "prev",
    });
  });

  page_Container.append(btn_prev, btn_next);
  return page_Container;
}

function create_Page_Types({ actual_Page = 1, last_Page = false }) {
  const page_Container = document.createElement("div");
  page_Container.dataset.actualPage = actual_Page;
  page_Container.id = "Btns_Page_Btns";
  const btn_prev = document.createElement("button");
  const btn_next = document.createElement("button");
  btn_prev.textContent = "Anterior";
  btn_next.textContent = "Siguiente";
  btn_prev.classList.add("style_Btn");
  btn_next.classList.add("style_Btn");

  if (actual_Page === 1) {
    btn_prev.disabled = true;
  }

  if (last_Page) btn_next.disabled = true;
  const basicNumber = 24;

  btn_next.addEventListener("click", () => {
    limit_Page_Types({
      limit: basicNumber * (actual_Page + 1),
      offset: basicNumber * actual_Page,
      btn: "next",
    });
  });
  btn_prev.addEventListener("click", () => {
    limit_Page_Types({
      limit: basicNumber * (actual_Page - 1),
      offset: basicNumber * (actual_Page - 1) - basicNumber,
      btn: "prev",
    });
  });

  page_Container.append(btn_prev, btn_next);
  return page_Container;
}
function resetBtns() {
  const page_Btns = document.querySelector("#Btns_Page_Btns");
  if (!page_Btns) {
    return;
  }
  main_Contain.removeChild(page_Btns);
  return page_Btns;
}
async function reload_Basic() {
  const pokemons = await getPokemons();
  await reload_Grid(pokemons);
  const page_Btns = create_Page({});
  main_Contain.append(page_Btns);
}
async function init() {
  const pokemons = await getPokemons();
  const poke_Grid = await create_Grid(pokemons.results);
  const page_Btns = create_Page({});
  main_Contain.append(poke_Grid, page_Btns);
}
async function init_Types() {
  const btn_Und2 = resetBtns();
  const poke_Array = await getPokemonTypes(search_Value);
  await reload_Grid(poke_Array.pokemon.slice(0, 24), "types");
  const create_Btns = create_Page_Types({ actual_Page: 1 });
  console.log(create_Btns);
  main_Contain.append(create_Btns);
}
async function init_Unit() {
  resetBtns();
  const poke_Unit = await getPokemonUnit(search_Value);
  console.log(poke_Unit);
  await reload_Grid([poke_Unit], "unit");
}
init();
export { main_Contain };
