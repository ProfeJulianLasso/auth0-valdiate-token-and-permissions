import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { PermissionsEnum } from './permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsEnum[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredPermissions.some((permission) => {
      return user.permissions.includes(permission);
    });
  }
}
