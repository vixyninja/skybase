export enum RoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const RoleValue = (val: string): RoleEnum => {
  switch (val) {
    case RoleEnum.ADMIN:
      return RoleEnum.ADMIN;
    case RoleEnum.USER:
      return RoleEnum.USER;
    default:
      return RoleEnum.USER;
  }
};
