import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgortPasswordEmail = new SendForgotPasswordEmailService();
    await sendForgortPasswordEmail.execute({
      email,
    });
    return response.status(204).json();
  }
}

export default ForgotPasswordController;
