import {SetMetadata} from '@nestjs/common';
import {RoleEnum} from 'src/enums';

export const Roles = (roles: RoleEnum[]) => SetMetadata(RoleEnum, roles);
