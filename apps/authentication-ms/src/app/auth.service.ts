import { Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
//import { JwtPayload } from './interfaces/';

import { RegisterUserDto, LoginUserDto } from './dto';
//import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger(AuthService.name);

  onModuleInit(){
    this.$connect();
    this.logger.log('[AuthService] Initialized Module');
  }

  async registerUser(registerUserDto: RegisterUserDto) {

    // extract info
    const { name, email, password,phone, address, role, isActive, createdAt, updatedAt } = registerUserDto;
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
          //createdAt : createdAt
          //updatedAt : updatedAt
        },
      });

      const { password: __, ...rest} = newUser;

      return {
        user: rest,
        //token: await this.sign
      }
    }
    catch (error){
      throw new UnauthorizedException(error.message + 'last catch');
    }
  }

}


