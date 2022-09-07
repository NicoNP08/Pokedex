import {
  getPokemonUnit,
  pokemonTypesHinglich,
  pokemonTypesHespanich,
} from "./pokeApi";
import styles from "./styles/pokemon.module.css";

async function create_Grid(poke_Array) {
  const poke_Grid = document.createElement("div");
  poke_Grid.className = styles.poke_Grid;
  poke_Grid.id = "pokeGrid";
  for (const pokemon of poke_Array) {
    const pokemon_Info = await getPokemonUnit(pokemon.name);
    const pokemon_Card = create_Card(pokemon_Info);
    poke_Grid.append(pokemon_Card);
  }
  return poke_Grid;
}
async function create_Type_Grid(poke_Array) {
  const poke_Grid = document.createElement("div");
  poke_Grid.className = styles.poke_Grid;
  poke_Grid.id = "pokeGrid";
  for (const pokemon of poke_Array) {
    const pokemon_Info = await getPokemonUnit(pokemon.pokemon.name);
    const pokemon_Card = create_Card(pokemon_Info);
    poke_Grid.append(pokemon_Card);
  }
  return poke_Grid;
}
function create_Unit_Grid(poke_Array) {
  const poke_Grid = document.createElement("div");
  poke_Grid.className = styles.poke_Grid;
  poke_Grid.id = "pokeGrid";
  for (const pokemon of poke_Array) {
    const pokemon_Card = create_Card(pokemon);
    poke_Grid.append(pokemon_Card);
  }
  return poke_Grid;
}
function create_Card(pokemon_Info) {
  const poke_Card = document.createElement("div");
  const card_Head = document.createElement("div");
  const card_Body = document.createElement("div");

  //Styles
  poke_Card.classList.add(styles.poke_Card);
  card_Head.classList.add(styles.card_Head);
  card_Body.classList.add(styles.card_Body);

  //contenido de la porra
  const pokemon_Name = document.createElement("h3");
  const pokemon_Id = document.createElement("span");

  pokemon_Name.textContent = pokemon_Info.name;
  pokemon_Id.textContent = `ID: ${pokemon_Info.id}`;

  //Styles
  pokemon_Name.classList.add(styles.pokemon_Name);
  pokemon_Id.classList.add(styles.pokemon_Id);

  const types_Container = document.createElement("div");
  const pokemon_TipoP = document.createElement("p");
  const main_TypeP = pokemon_Info.types[0].type.name;
  pokemon_TipoP.textContent = pokemonTypesHespanich[main_TypeP];
  types_Container.append(pokemon_TipoP);

  //Styles
  types_Container.classList.add(styles.types_Container);
  pokemon_TipoP.classList.add(
    styles.pokemon_TipoBase,
    styles[`pokeTipo_${main_TypeP}`]
  );

  if (pokemon_Info.types.length > 1) {
    const pokemon_TipoS = document.createElement("p");
    const secondaryTypeP = pokemon_Info.types[1].type.name;
    pokemon_TipoS.textContent = pokemonTypesHespanich[secondaryTypeP];
    types_Container.append(pokemon_TipoS);

    //Styles
    pokemon_TipoS.classList.add(
      styles.pokemon_TipoBase,
      styles[`pokeTipo_${secondaryTypeP}`]
    );
  }

  //contenido del cuerpillo
  const poke_Img = document.createElement("img");
  poke_Img.src = pokemon_Info.sprites.front_default;

  //Styles
  poke_Img.classList.add(styles.poke_Img);

  card_Head.append(pokemon_Name, pokemon_Id, types_Container);
  card_Body.append(poke_Img);
  poke_Card.append(card_Head, card_Body);
  poke_Card.addEventListener("click", () => create_Pkm_Inf(pokemon_Info));
  return poke_Card;
}
function create_Pkm_Inf(pokemon_Info) {
  console.log(pokemon_Info.name);
}

export { create_Grid, create_Type_Grid, create_Unit_Grid };
