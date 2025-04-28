import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'repuesto_procs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cantidad').notNullable()
      table.decimal('precio_unitario').notNullable()
      table.decimal('precio_total').notNullable()
      table.integer('procedimiento_mantenimiento_id').unsigned().references('id').inTable('procedimiento_mantenimientos').onDelete('CASCADE')
      table.integer('repuesto_id').unsigned().references('id').inTable('repuestos').onDelete('CASCADE')

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
