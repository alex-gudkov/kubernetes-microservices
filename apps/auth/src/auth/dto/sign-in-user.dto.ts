import { IsString } from 'class-validator';

export class SignInUserDto {
  @IsString()
  public readonly login: string;

  @IsString()
  public readonly password: string;
}
