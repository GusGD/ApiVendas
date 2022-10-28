import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      password,
      email,
    });
    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();
    return response.json(users);
  }
}

export default UsersController;
