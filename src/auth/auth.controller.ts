import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const token = await this.service.login(dto);
    if (!token) throw new UnauthorizedException('Invalid credentials');
    return { token };
  }

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const result = await this.service.signup(dto);
    if (!result) throw new UnauthorizedException('Email already in use');
    return result;
  }
}
