import {ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {AuthGuard} from '@nestjs/passport';
import {PUBLIC_ROUTE_KEY} from 'src/decorators';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (isPublic) {
        return true;
      }

      return super.canActivate(context);
    } catch (e) {
      throw e;
    }
  }
}
