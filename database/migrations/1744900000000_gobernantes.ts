import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gobernantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('nombre').notNullable()
      table.string('periodo_init').notNullable(),
      table.string('periodo_end').notNullable(),
      table.integer('idDepartamento').unsigned().references('id').inTable('departamentos').onDelete('CASCADE')
      table.integer('idMunicipio').unsigned().references('id').inTable('municipios').onDelete('CASCADE')

      /**
       * Uses integer as PostgreSQL and BIGINT as MSSQL
       */

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
