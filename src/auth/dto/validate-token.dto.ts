import { IsString, IsNotEmpty, IsJWT } from 'class-validator';

export class ValidateTokenDto {
  @IsJWT()
  @IsString()
  @IsNotEmpty()
  token: string;
}
