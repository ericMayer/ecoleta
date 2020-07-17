import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("items").insert([
    { title: "Lâmpadas", image: "lampadas.svg" },
    { title: "Pilhas e Baterias", image: "baterias.sgv" },
    { title: "Papéis", image: "papeis.sgv" },
    { title: "Eletrônicos", image: "eletronicos.sgv" },
    { title: "Orgânicos", image: "organicos.sgv" },
    { title: "Óleo de cozinha", image: "oleo.sgv" },
  ]);
}
