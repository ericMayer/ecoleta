// criando tabela que será responsável
// por armazenar todos os items que podem
// ser coletados para dar os devidos fins
// obrigatoriamente precisa ter as funções com nomes
// up e down para criação automática do banco com knex,
// caso não tenha irá dar erro

// Instância do Knex que será usado para criar
// o banco de dado
import Knex from "knex";

// função responsável pela criação da tabela
export async function up(knex: Knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("image").notNullable();
  });
}

// função responsável por deletar a tabela,
// caso tenha sido feito algo errado
export async function down(knex: Knex) {
  return knex.schema.dropTable("items");
}
