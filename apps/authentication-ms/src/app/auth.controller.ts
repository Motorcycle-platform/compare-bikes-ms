import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto, LoginUserDto } from './dto';
import { AuthGuard } from './guard/auth.guard';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  //@MessagePattern('app.register.user')
  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registerUser(registerUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Get('/other')
  @UseGuards(AuthGuard)
  other () {
    return 'other';
  }
}
