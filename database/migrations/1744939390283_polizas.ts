import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'polizas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.integer('operario_id').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
      table.integer('seguro_id').unsigned().references('id').inTable('seguros').onDelete('CASCADE')
      table.enum('tipo_poliza', [
        'ARL',
        'SEGURO_VIDA',
        'SEGURO_ACCIDENTES',
        'TODO_RIESGO',
        'RESPONSABILIDAD_CIVIL',
        'DANOS_TERCEROS'
      ]).notNullable()
      table.dateTime('fecha_inicio').notNullable()
      table.dateTime('fecha_fin').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // ✅ XOR CHECK con validación adicional de tipos de póliza
      table.check(`
        (maquina_id IS NOT NULL AND operario_id IS NULL AND tipo_poliza IN ('TODO_RIESGO', 'RESPONSABILIDAD_CIVIL', 'DANOS_TERCEROS'))
        OR
        (maquina_id IS NULL AND operario_id IS NOT NULL AND tipo_poliza IN ('ARL', 'SEGURO_VIDA', 'SEGURO_ACCIDENTES'))
      `)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
