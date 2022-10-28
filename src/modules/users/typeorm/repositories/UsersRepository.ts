import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      name,
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.findOne({
      id,
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      email,
    });
    return user;
  }
}
