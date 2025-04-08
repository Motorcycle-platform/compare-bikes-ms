import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto, LoginUserDto } from './dto';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  //@MessagePattern('app.register.user')
  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registerUser(registerUserDto);
  }

}
