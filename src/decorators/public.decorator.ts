import {CustomDecorator, SetMetadata} from '@nestjs/common';

export const PUBLIC_ROUTE_KEY = 'public_route';

export const PublicRoute = (isPublic = true): CustomDecorator => SetMetadata(PUBLIC_ROUTE_KEY, isPublic);
