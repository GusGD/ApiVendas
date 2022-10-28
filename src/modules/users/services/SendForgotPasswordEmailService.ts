import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UsersTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email address does not exists.');
    }
    const token = await userTokenRepository.generate(user.id);
    await usersRepository.save(user);
  }
}
export default SendForgotPasswordEmailService;
