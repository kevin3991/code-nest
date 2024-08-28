import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { responseMaker } from 'src/utils/helpers';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    await this.authService.register(createAuthDto);
    return responseMaker(200, {}, 'Register successfully');
  }
}
