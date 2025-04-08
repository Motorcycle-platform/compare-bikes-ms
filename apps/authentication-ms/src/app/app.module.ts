import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { genvs } from '../../../../libs/commons/config/genvs';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: genvs.jwtSecret,
      signOptions: { expiresIn: '2h' },
    }),
  ]
})
export class AppModule {}
