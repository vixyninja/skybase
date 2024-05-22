export enum PermissionEnum {
  SELECT = 'select',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = '000',
  NONE = '111',
}

export const PermissionValue = (val: string): PermissionEnum => {
  switch (val) {
    case PermissionEnum.SELECT:
      return PermissionEnum.SELECT;
    case PermissionEnum.CREATE:
      return PermissionEnum.CREATE;
    case PermissionEnum.UPDATE:
      return PermissionEnum.UPDATE;
    case PermissionEnum.DELETE:
      return PermissionEnum.DELETE;
    case PermissionEnum.ALL:
      return PermissionEnum.ALL;
    case PermissionEnum.NONE:
      return PermissionEnum.NONE;
    default:
      return PermissionEnum.NONE;
  }
};
