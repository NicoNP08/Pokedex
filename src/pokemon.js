import {
  getPokemonUnit,
  pokemonTypesHinglich,
  pokemonTypesHespanich,
} from "./pokeApi";
import { main_Contain } from "./main.js";
import styles from "./styles/pokemon.module.css";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

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
  const poke_Info_Cont = document.createElement("div");
  const poke_Title_Cont = document.createElement("div");
  const poke_Img_Cont = document.createElement("div");
  const poke_Stats_Cont = document.createElement("div");
  const poke_Types_Cont = document.createElement("div");
  const poke_Chart_Cont = document.createElement("div");
  poke_Info_Cont.classList.add(styles.poke_Info_container);
  poke_Title_Cont.classList.add(styles.poke_Title_container);
  poke_Img_Cont.classList.add(styles.poke_Img_container);
  poke_Stats_Cont.classList.add(styles.poke_Stats_container);
  poke_Types_Cont.classList.add(styles.tipos_Pok);
  poke_Chart_Cont.classList.add(styles.tablita_Pok);

  const title_Name = document.createElement("h2");
  title_Name.textContent = `${pokemon_Info.name}  ID: ${pokemon_Info.id} `;

  const poke_Img_Inf = document.createElement("img");
  poke_Img_Inf.src = pokemon_Info.sprites.front_default;
  const main_TypeP = [pokemon_Info.types[0].type.name];
  const tipos1 = document.createElement("span");
  tipos1.textContent = `${pokemonTypesHespanich[main_TypeP]}`;
  tipos1.classList.add(
    styles.pokemon_TipoBase,
    styles[`pokeTipo_${main_TypeP}`]
  );
  poke_Types_Cont.append(tipos1);
  if (pokemon_Info.types.length > 1) {
    const tipos2 = document.createElement("span");
    const secondaryTypeP = [pokemon_Info.types[1].type.name];
    tipos2.textContent = pokemonTypesHespanich[secondaryTypeP];
    tipos2.classList.add(
      styles.pokemon_TipoBase,
      styles[`pokeTipo_${secondaryTypeP}`]
    );
    poke_Types_Cont.append(tipos2);
  }

  const stats_Peso = document.createElement("h3");
  stats_Peso.textContent = `Peso: ${pokemon_Info.weight}`;

  const tabla_Inf = document.createElement("canvas");

  const labels = [];
  const data = [];
  pokemon_Info.stats.forEach((statInfo) => {
    labels.push(statInfo.stat.name);
    data.push(statInfo.base_stat);
  });
  const grafica = new Chart(tabla_Inf, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Stats",
          data,
          backgroundColor: ["#ff1100"],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          max: 160,
        },
      },
    },
  });

  poke_Stats_Cont.append(stats_Peso);
  poke_Chart_Cont.append(tabla_Inf);
  poke_Img_Cont.append(poke_Img_Inf);
  poke_Title_Cont.append(title_Name);
  poke_Info_Cont.append(
    poke_Title_Cont,
    poke_Img_Cont,
    poke_Stats_Cont,
    poke_Types_Cont,
    poke_Chart_Cont
  );
  const exit = document.createElement("span");
  exit.textContent = "X";
  exit.classList = styles.salida;
  exit.addEventListener("click", () => {
    main_Contain.removeChild(poke_Info_Cont);
  });
  poke_Info_Cont.append(exit);
  main_Contain.append(poke_Info_Cont);
}

export { create_Grid, create_Type_Grid, create_Unit_Grid };
