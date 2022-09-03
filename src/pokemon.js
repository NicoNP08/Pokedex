import { getPokemonUnit } from "./pokeApi";
import styles from "./styles/pokemon.module.css";

async function create_Grid(poke_Array) {
  const poke_Grid = document.createElement("div");
  poke_Grid.className = styles.poke_Grid;
  for (const pokemon of poke_Array) {
    const pokemon_Info = await getPokemonUnit(pokemon.name);
    const pokemon_Card = create_Card(pokemon_Info);
    poke_Grid.append(pokemon_Card);
  }
  return poke_Grid;
}
function create_Card(pokemon_Info) {
  const poke_Card = document.createElement("div");
  const card_Head = document.createElement("div");
  const card_Body = document.createElement("div");

  //contenido de la porra
  const pokemon_Name = document.createElement("h3");
  const pokemon_Id = document.createElement("span");

  pokemon_Name.textContent = pokemon_Info.name;
  pokemon_Id.textContent = `ID: ${pokemon_Info.id}`;

  const types_Container = document.createElement("div");
  const pokemon_TipoP = document.createElement("p");
  pokemon_TipoP.textContent = pokemon_Info.types[0].type.name;
  types_Container.append(pokemon_TipoP);

  if (pokemon_Info.types.length > 1) {
    const pokemon_TipoS = document.createElement("p");
    pokemon_TipoS.textContent = pokemon_Info.types[1].type.name;
    types_Container.append(pokemon_TipoS);
  }

  //contenido del cuerpillo
  const poke_Img = document.createElement("img");
  poke_Img.src = pokemon_Info.sprites.front_default;
  console.log(pokemon_Info.types.length);
  card_Head.append(pokemon_Name, pokemon_Id, types_Container);
  card_Body.append(poke_Img);
  poke_Card.append(card_Head, card_Body);
  return poke_Card;
}

export { create_Grid };
