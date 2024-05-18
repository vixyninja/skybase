// import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
// import {Reflector} from '@nestjs/core';
// import {RoleEnum} from 'src/enums';
// import {UserEntity} from 'src/modules/user/entities';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     try {
//       const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(RoleEnum, [
//         context.getHandler(),
//         context.getClass(),
//       ]);
//       const request = context.switchToHttp().getRequest();
//       const user = <UserEntity>request.user;
//       if (!user) {
//         throw new UnauthorizedException('You do not have permission to access this resource');
//       }
//       const hasRole = () => requiredRoles.every((role) => user.role?.includes(role));
//       if (!(user && user.role && hasRole())) {
//         throw new UnauthorizedException('You do not have permission to access this resource');
//       }
//       return true;
//     } catch (e) {
//       throw e;
//     }
//   }
// }
