import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(params: CreateAuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: params.email },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);
    }

    if (!(await bcrypt.compare(params.password, user.password))) {
      throw new HttpException('WRONG_PASSWORD', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email };

    return {
      message: 'LOGIN_SUCCESSFUL',
      data: {
        token: await this.jwtService.signAsync(payload),
      },
    };
  }

  async register(params: CreateAuthDto) {
    if (
      await this.userRepository.findOne({
        where: { email: params.email },
      })
    ) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    this.userRepository.save({
      email: params.email,
      password: await bcrypt.hash(params.password, 10),
    });

    return {
      message: 'USER_CREATED',
    };
  }
}
