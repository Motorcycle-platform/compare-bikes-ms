import { IsBoolean, IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  role: string;

  @IsBoolean()
  isActive: boolean;

}
