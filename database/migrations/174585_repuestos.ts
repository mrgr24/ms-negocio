import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Repuestos extends BaseSchema {
  protected tableName = 'repuestos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.string('descripcion').nullable()
      table.string('marca').notNullable()
      table.decimal('precio', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}