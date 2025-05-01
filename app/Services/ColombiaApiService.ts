import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

interface Departamento {
  id: number
  departamento: string
  ciudades?: Ciudad[]
}

interface Ciudad {
  id: number
  nombre: string
}

export default class ColombiaApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = Env.get('COLOMBIA_API_URL')
  }

  public async getAllDepartamentos(): Promise<Departamento[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error al obtener departamentos: ${error.response?.data?.error || error.message}`)
      }
      throw error
    }
  }

  public async getDepartamentoByNombre(nombreDepartamento: string): Promise<Departamento | null> {
    try {
        const response = await axios.get(`${this.baseUrl}/${nombreDepartamento}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`El departamento "${nombreDepartamento}" no fue encontrado en la API.`)
        }
        throw error
    }
}

public async getCiudadesByDepartamento(departamento: string): Promise<Ciudad[]> {
    try {
        const response = await axios.get(`${this.baseUrl}/ciudades/${departamento}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            throw new Error(`No se encontraron municipios para el departamento "${departamento}".`)
        }
        throw error
    }
}
}