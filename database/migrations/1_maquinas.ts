import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'maquinas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('Especialidad').notNullable()
      table.string('Marca').notNullable()
      table.string('Modelo').notNullable()
      table.string('Estado').notNullable()
      table.string('Ubicacion').notNullable()
      table.boolean('Disponibilidad').notNullable().defaultTo(true)
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
