export enum UserStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export const UserStatusValue = (val: string): UserStatusEnum => {
  switch (val) {
    case UserStatusEnum.ACTIVE:
      return UserStatusEnum.ACTIVE;
    case UserStatusEnum.INACTIVE:
      return UserStatusEnum.INACTIVE;
    case UserStatusEnum.BLOCKED:
      return UserStatusEnum.BLOCKED;
    default:
      return UserStatusEnum.INACTIVE;
  }
};
