import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gobernante from 'App/Models/Gobernante'
import GobernanteMunicipio from 'App/Models/GobernanteMunicipio'
import GobernanteDepartamento from 'App/Models/GobernanteDepartamento'
import { DateTime } from 'luxon'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class GobernantesController {
  public async create({ request, response }: HttpContextContract) {
    const { user_id, periodoInit, periodoEnd, territorio, tipo } = request.only([
      'user_id',
      'periodoInit',
      'periodoEnd',
      'territorio',
      'tipo',
    ])

    // Verificar si el usuario existe en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
        headers: { Authorization: request.header('Authorization') },
      })
    } catch (error) {
      return response.status(404).send({
        message: 'El usuario no existe en ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Crear el gobernante
    const gobernante = await Gobernante.create({ user_id, periodoInit, periodoEnd })

    // Asignar territorio
    if (tipo === 'departamento') {
      // Verificar si ya tiene municipios asignados activamente (XOR)
      const municipiosActivos = await GobernanteMunicipio.query()
        .where('gobernante_id', gobernante.id)
        .where('fecha_fin', '>=', DateTime.now().toSQL())
        .first()

      if (municipiosActivos) {
        return response.badRequest({
          message: 'El gobernante ya está asignado a un municipio. No puede ser asignado a un departamento simultáneamente.',
        })
      }

      // Crear asignación en la tabla intermedia
      await GobernanteDepartamento.create({
        gobernante_id: gobernante.id,
        departamento_id: territorio.departamento_id,
        fecha_inicio: periodoInit,
        fecha_fin: periodoEnd,
      })
    } else if (tipo === 'municipio') {
      // Verificar si ya tiene departamentos asignados activamente (XOR)
      const departamentosActivos = await GobernanteDepartamento.query()
        .where('gobernante_id', gobernante.id)
        .where('fecha_fin', '>=', DateTime.now().toSQL())
        .first()

      if (departamentosActivos) {
        return response.badRequest({
          message: 'El gobernante ya está asignado a un departamento. No puede ser asignado a un municipio simultáneamente.',
        })
      }

      // Crear asignación en la tabla intermedia
      await GobernanteMunicipio.create({
        gobernante_id: gobernante.id,
        municipio_id: territorio.municipio_id,
        fecha_inicio: periodoInit,
        fecha_fin: periodoEnd,
      })
    } else {
      return response.badRequest({ message: 'Tipo de territorio inválido' })
    }

    return response.status(201).send({ message: 'Gobernante creado y territorio asignado' })
  }

  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        // Buscar un gobernante específico por ID
        const gobernante = await Gobernante.query()
          .where('id', params.id)
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .firstOrFail();

        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`);
        const {_id, name, email} = userResponse.data;  
  
        return response.ok({
            id: gobernante.id,
            user: {id: _id, name, email}, // Información del usuario
            periodo_init: gobernante.periodoInit,
            periodo_end: gobernante.periodoEnd,
            departamentos: gobernante.departamentos,
            municipios: gobernante.municipios
        });
      } else {

        const gobernantes = await Gobernante.query()
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          });

        const gobernantesWithUserData = await Promise.all(
          gobernantes.map(async (gobernante) => {
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${gobernante.user_id}`);
            const {_id, name, email} = userResponse.data; // Filtrar solo los campos necesarios

            return {
              id: gobernante.id,
              user: {id: _id, name, email}, // Información del usuario
              periodo_init: gobernante.periodoInit,
              periodo_end: gobernante.periodoEnd,
              departamentos: gobernante.departamentos,
              municipios: gobernante.municipios
            };
          })
        );
  
        return response.ok(gobernantesWithUserData);
      }
    } catch (error) {
      console.error('Error al listar gobernantes:', error.message);
      return response.internalServerError({
        message: 'Error al listar gobernantes.',
        error: error.message,
      });
    }
  }
}