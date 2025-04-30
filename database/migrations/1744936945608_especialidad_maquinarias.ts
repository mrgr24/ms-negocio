import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'especialidad_maquinarias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tipo_servicio_id').unsigned().references('id').inTable('tipo_servicios').onDelete('CASCADE')
      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.string('tipo_trabajo').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
