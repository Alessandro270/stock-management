import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }
  async login(dto: LoginDto) {
    const user = await this.userService.findOneBy({ email: dto.email });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) return null;
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }
  async signup() {}
}
