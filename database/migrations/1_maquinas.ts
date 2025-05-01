import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'maquinas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('especialidad').notNullable()
      table.string('marca').notNullable()
      table.string('modelo').notNullable()
      table.string('estado').notNullable()
      table.string('ubicacion').notNullable()
      table.boolean('disponibilidad').notNullable().defaultTo(true)
      table.date('fecha_asignacion').nullable()
      table.date('fecha_retiro').nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
