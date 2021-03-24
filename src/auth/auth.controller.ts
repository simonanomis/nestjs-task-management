import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.signUp(authCredentials);
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.authService.getUsers();
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) authCredentials: AuthCredentialsDto) {
    return await this.authService.signIn(authCredentials);
  }
}
