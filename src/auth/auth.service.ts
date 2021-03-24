import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentials);
  }

  async getUsers(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async signIn(authCredentials: AuthCredentialsDto) {
    const username = await this.userRepository.validateUserPassword(
      authCredentials,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
