// criando tabela que será responsável
// por armazenar todos os pontos de coletas de
// items que não podem ser descartados no meio ambiente
// obrigatoriamente precisa ter as funções com nomes
// up e down para criação automática do banco com knex,
// caso não tenha irá dar erro

// Instância do Knex que será usado para criar
// o banco de dados
import Knex from "knex";

// função responsável pela criação da tabela
// realizando criação da tabela com os campos
export async function up(knex: Knex) {
  return knex.schema.createTable("points", (table) => {
    table.increments("id").primary();
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("uf", 2).notNullable();
    table.string("city").notNullable();
    table.string("endereco").notNullable();
    table.string("numero").notNullable();
  });
}

// função responsável por deletar a tabela,
// caso tenha sido feito algo errado
// para utilizar o conceito de migrations que faz um histórico
// do banco de dados é necessário ter o return,
// na documento do knex explica essas informações
export async function down(knex: Knex) {
  return knex.schema.dropTable("points");
}
