import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class NotificationService {
  private baseUrl: string

  constructor() {
    this.baseUrl = Env.get('NOTIFICATION_API')
  }

  /**
   * Envía un email usando el servicio de notificaciones
   */
  public async sendEmail(recipient: string, message: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/send_email`, {
        recipient,
        message
      })
      
      return response.data.mensaje === "the message has been sent"
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }

  /**
   * Envía un link de reseteo de contraseña
   */
  public async sendResetLink(recipient: string, resetLink: string): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/send_reset_link`, {
        recipient,
        message: resetLink
      })

      return response.data.mensaje === "the message has been sent"
    } catch (error) {
      console.error('Error sending reset link:', error)
      return false
    }
  }
}