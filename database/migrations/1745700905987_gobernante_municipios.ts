import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gobernante_municipios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('gobernante_id').unsigned().references('id').inTable('gobernantes').onDelete('CASCADE')
      table.string('municipio_id').references('id').inTable('municipios').onDelete('CASCADE')
      table.dateTime('fecha_inicio')
      table.dateTime('fecha_fin')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
