import { AbstractRepository, EntityRepository, getConnection } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, user.salt);
    //delete all
    //await getConnection().createQueryBuilder().delete().from(User).execute();
    try {
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(): Promise<User[]> {
    return await this.repository.find();
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.findOneUser(username);

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.repository.findOne({ username });
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
