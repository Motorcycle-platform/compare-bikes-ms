import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './guard/auth.guard';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  registerUser(@Payload() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registerUser(registerUserDto);
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @MessagePattern('auth.verify.user')
  @UseGuards(AuthGuard)
  other () {
    return 'other';
  }
}
