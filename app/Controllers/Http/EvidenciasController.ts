import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidencia from 'App/Models/Evidencia';
import EvidenciaValidator from 'App/Validators/EvidenciaValidator';
import { DateTime } from 'luxon';
import { cuid } from '@ioc:Adonis/Core/Helpers';
import Application from '@ioc:Adonis/Core/Application';
import { promises as fs } from 'fs';

export default class EvidenciasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEvidencia: Evidencia = await Evidencia.findOrFail(params.id)
            return theEvidencia;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Evidencia.query().paginate(page, perPage)
            } else {
                return await Evidencia.query()
            }
        }
    }    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(EvidenciaValidator);
        const theEvidencia: Evidencia = await Evidencia.create(payload);
        return theEvidencia;
    }    public async upload_photo({ request, response }: HttpContextContract) {
        try {
            // Validar la entrada usando el uploadSchema
            const validator = new EvidenciaValidator({ request, response } as any);
            const payload = await request.validate({ 
                schema: validator.uploadSchema,
                messages: validator.messages 
            });
            
            // Validar que se proporcione exactamente uno de los dos campos (XOR)
            const hasServicio = payload.id_servicio !== undefined;
            const hasNovedad = payload.novedad_id !== undefined;
            
            if (!hasServicio && !hasNovedad) {
                return response.status(400).json({
                    error: 'Debe proporcionarse al menos uno: id_servicio o novedad_id'
                });
            }
            
            if (hasServicio && hasNovedad) {
                return response.status(400).json({
                    error: 'Una evidencia solo puede estar asociada a un servicio O a una novedad, no a ambos'
                });
            }
            
            const imagen = payload.imagen;

            // Verificar que el archivo existe
            if (!imagen) {
                return response.status(400).json({
                    error: 'No se ha proporcionado ningún archivo'
                });
            }

            // Generar nombre único para el archivo
            const uniqueId = cuid();
            const extension = imagen.extname || 'jpg';
            const nombreArchivo = `${uniqueId}.${extension}`;
            
            // Definir la ruta donde se guardará el archivo
            const uploadsPath = Application.publicPath('uploads');

            // Crear la carpeta si no existe
            await fs.mkdir(uploadsPath, { recursive: true });

            // Mover el archivo a la carpeta uploads
            await imagen.move(uploadsPath, {
                name: nombreArchivo,
                overwrite: false
            });

            // Verificar que el archivo se movió correctamente
            if (imagen.hasErrors) {
                return response.status(500).json({
                    error: 'Error al subir el archivo',
                    details: imagen.errors
                });
            }            // Crear registro en la base de datos
            const evidenciaData: any = {
                ruta_archivo: `/uploads/${nombreArchivo}`,
                fecha_de_carga: DateTime.now()
            };
            
            // Añadir solo el campo que está presente
            if (payload.id_servicio) {
                evidenciaData.id_servicio = payload.id_servicio;
            }
            
            if (payload.novedad_id) {
                evidenciaData.novedad_id = payload.novedad_id;
            }
            
            const evidencia = await Evidencia.create(evidenciaData);

            return response.status(201).json({
                message: 'Imagen subida exitosamente',
                evidencia: evidencia,
                url: `/uploads/${nombreArchivo}`
            });

        } catch (error) {
            return response.status(500).json({
                error: 'Error interno del servidor',
                details: error.message
            });
        }
    }

    public async get_photo({ params, response }: HttpContextContract) {
        try {
            const evidencia = await Evidencia.findOrFail(params.id);
            const rutaArchivo = Application.publicPath(evidencia.ruta_archivo.substring(1)); // Remover el primer '/'

            // Verificar que el archivo existe
            try {
                await fs.access(rutaArchivo);
            } catch {
                return response.status(404).json({
                    error: 'Archivo no encontrado'
                });
            }

            // Servir el archivo
            return response.download(rutaArchivo);

        } catch (error) {
            return response.status(404).json({
                error: 'Evidencia no encontrada'
            });
        }
    }    public async update({ params, request, response }: HttpContextContract) {
        const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
        const payload = await request.validate(EvidenciaValidator);
        
        // Validar que se proporcione exactamente uno de los dos campos (XOR)
        const hasServicio = payload.id_servicio !== undefined;
        const hasNovedad = payload.novedad_id !== undefined;
        
        if (!hasServicio && !hasNovedad) {
            return response.status(400).json({
                error: 'Debe proporcionarse al menos uno: id_servicio o novedad_id'
            });
        }
        
        if (hasServicio && hasNovedad) {
            return response.status(400).json({
                error: 'Una evidencia solo puede estar asociada a un servicio O a una novedad, no a ambos'
            });
        }
        
        // Resetear ambos campos y luego asignar solo el que está presente
        theEvidencia.id_servicio = null;
        theEvidencia.novedad_id = null;
        
        if (payload.id_servicio) {
            theEvidencia.id_servicio = payload.id_servicio;
        }
        
        if (payload.novedad_id) {
            theEvidencia.novedad_id = payload.novedad_id;
        }
        
        return await theEvidencia.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const theEvidencia: Evidencia = await Evidencia.findOrFail(params.id);
            
            // Eliminar el archivo físico si existe
            if (theEvidencia.ruta_archivo) {
                const rutaArchivo = Application.publicPath(theEvidencia.ruta_archivo.substring(1));
                try {
                    await fs.unlink(rutaArchivo);
                } catch (error) {
                    console.log('Archivo físico no encontrado o ya eliminado:', error.message);
                }
            }

            // Eliminar el registro de la base de datos
            await theEvidencia.delete();
            
            response.status(204);
            return { message: 'Evidencia eliminada exitosamente' };
        } catch (error) {
            return response.status(500).json({
                error: 'Error al eliminar la evidencia',
                details: error.message
            });
        }
    }
}