import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Permissions } from './permissions.decorator';
import { PermissionsEnum } from './permissions.enum';
import { PermissionsGuard } from './permissions.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }

  @Get('protected')
  @Permissions(PermissionsEnum.DELETE)
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  getProtected(): { message: string } {
    return { message: this.appService.getProtected() };
  }
}
