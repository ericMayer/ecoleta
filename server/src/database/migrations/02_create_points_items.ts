// tabela que terá o id dos pontos de coletas
// e os items que coletam, nessa tabela será
// armazenado, por empresa Empresa Natureza coleta lâmpadas,
// Empresa Natureza coleta baterias, assim é possível
// armazenar todos os items que são coletados por uma empresa
// ou mais de uma empresa
// o relacionamento da tabela é de N para N, por isso
// pode ter uma ou mais empresas que coletem o mesmo item e
// uma empresa que colete vários items
// obrigatoriamente precisa ter as funções com nomes
// up e down para criação automática do banco com knex,
// caso não tenha irá dar erro

// Instância do Knex que será usado para criar
// o banco de dado
import Knex from "knex";

// função responsável pela criação da tabela
export async function up(knex: Knex) {
  return knex.schema.createTable("points_items", (table) => {
    table.increments("id").primary();
    table.integer("point_id").notNullable().references("id").inTable("points");
    table.integer("item_id").notNullable().references("id").inTable("items");
  });
}

// função responsável por deletar a tabela,
// caso tenha sido feito algo errado
export async function down(knex: Knex) {
  return knex.schema.dropTable("points_items");
}
