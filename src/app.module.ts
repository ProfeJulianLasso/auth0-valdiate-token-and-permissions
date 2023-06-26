import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './jwt-strategy.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
