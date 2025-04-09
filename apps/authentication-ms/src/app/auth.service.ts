import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { RegisterUserDto, LoginUserDto } from './dto';
@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  onModuleInit(){
    this.$connect();
    this.logger.log('[AuthService] Initialized Module');
  }

  async signJWT(paylod: JwtPayload ){
    return this.jwtService.sign(paylod);
  }

  async registerUser(registerUserDto: RegisterUserDto) {

    // extract info
    const { name, email, password,phone, address, role, isActive} = registerUserDto;
    try{
      const user = await this.user.findUnique({
        where: { email: registerUserDto.email },
      });

      if (user) {
        throw new UnauthorizedException('User already exists');
      }

      const newUser = await this.user.create({
        data:{
          name : name,
          email : email,
          password : await bcrypt.hash(password, 12),
          phone : phone,
          address : address,
          role : role,
          isActive : isActive,
        },
      });

      const { password: __, ...rest} = newUser;

      return {
        user: rest,
        token: await this.signJWT(rest),
      }
    }
    catch (error){
      throw new UnauthorizedException(error.message + 'last catch');
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password: __, ...rest} = user;

      return {
        user: rest,
        token: await this.signJWT(rest),
      }
    }
    catch (error){
      throw new UnauthorizedException(error.message + 'last catch');
    }
  }

}


