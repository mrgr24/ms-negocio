import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'maquina_combos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.integer('combo_id').unsigned().references('id').inTable('combos').onDelete('CASCADE')
      table.dateTime('fecha_inicio').notNullable()
      table.dateTime('fecha_fin').notNullable()

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
