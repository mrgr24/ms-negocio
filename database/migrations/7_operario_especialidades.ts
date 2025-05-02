import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'operario_especialidads'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('operario_id').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
      table.integer('especialidad_id').unsigned().references('id').inTable('especialidads').onDelete('CASCADE')
      table.string('nivel_experiencia').notNullable()
      
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
