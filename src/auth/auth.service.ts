import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(dto.refreshToken);
      const user = await this.userService.findOneBy(payload.sub);
      if (!user) return null;
      if (user.refreshToken !== dto.refreshToken)
        throw new BadRequestException('Token invalido');
      return await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async validateToken(dto: ValidateTokenDto) {
    try {
      return await this.jwtService.verifyAsync(dto.token);
    } catch (e) {
      throw new BadRequestException('Invalid token');
    }
  }
  async login(dto: LoginDto) {
    const user = await this.userService.findOneWithPassword({
      email: dto.email,
    });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) return null;
    let refreshToken = user.refreshToken;
    if (!user.refreshToken) {
      const refreshToken = await this.jwtService.signAsync(
        { sub: user.id, email: user.email },
        { expiresIn: '7d' },
      );
      await this.userService.update(user.id, { refreshToken });
    }
    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return {
      user: { ...user, password: undefined, refreshToken: undefined },
      token,
      refreshToken,
    };
  }
  async signup(dto: CreateUserDto) {
    const user = await this.userService.findOneBy({ email: dto.email });
    if (user) return null;
    const hashedPassword = await this.hashPassword(dto.password);

    try {
      const newUser = await this.userService.create({
        ...dto,
        password: hashedPassword,
      });

      newUser.refreshToken = await this.jwtService.signAsync(
        { sub: newUser.id, email: newUser.email },
        { expiresIn: '7d' },
      );

      return await this.userService.update(newUser.id, { ...newUser });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
