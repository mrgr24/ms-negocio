import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'evidencias'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ruta_archivo').notNullable()
      table.date('fecha_de_carga').notNullable()
      table.integer('id_servicio').nullable().unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      table.integer('novedad_id').nullable().unsigned().references('id').inTable('novedads').onDelete('CASCADE')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
