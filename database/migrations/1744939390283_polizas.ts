import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.integer('operario_id').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
      table.integer('seguro_id').unsigned().references('id').inTable('seguros').onDelete('CASCADE')
      table.dateTime('fecha_inicio').notNullable()
      table.dateTime('fecha_fin').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // ✅ XOR CHECK
      table.check(`
        (maquina_id IS NOT NULL AND operario_id IS NULL)
        OR
        (maquina_id IS NULL AND operario_id IS NOT NULL)
      `)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
