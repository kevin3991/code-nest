import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { responseMaker } from 'src/utils/helpers';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@GetUser() user: any) {
    const data = await this.userService.getUserInfo(user.sub);

    return responseMaker(
      200,
      {
        id: data.id,
        email: data.email,
      },
      'Get user successfully',
    );
  }
}
