import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class ColombiaApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = Env.get('COLOMBIA_API_URL')
  }

  public async getAllDepartamentos() {
    try {
      const response = await axios.get(`${this.baseUrl}/`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDepartamentos() {
    try {
      const response = await axios.get(`${this.baseUrl}/departamentos`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getDepartamentoByNombre(nombreDepartamento: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${nombreDepartamento}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getCiudadesByDepartamento(departamento: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/ciudades/${departamento}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
}