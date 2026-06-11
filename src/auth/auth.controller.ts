import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const payload = await this.service.login(dto);
    if (!payload) throw new UnauthorizedException('Invalid credentials');
    return payload;
  }

  // @Public()
  @Roles(Role.ADMIN)
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const result = await this.service.signup(dto);
    if (!result) throw new UnauthorizedException('Email already in use');
    return result;
  }

  @Public()
  @Post('validate-token')
  async validateToken(@Body() dto: ValidateTokenDto) {
    const result = await this.service.validateToken(dto);
    if (!result) throw new BadRequestException('Invalid Token');
    return result;
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    const token = await this.service.refreshToken(dto);
    if (!token) throw new BadRequestException('Invalid Token');
    return { token };
  }
}
