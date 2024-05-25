export enum DeviceEnum {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
  OTHER = 'other',
}

export const DeviceEnumValue = (val: string): DeviceEnum => {
  switch (val) {
    case DeviceEnum.ANDROID:
      return DeviceEnum.ANDROID;
    case DeviceEnum.IOS:
      return DeviceEnum.IOS;
    case DeviceEnum.WEB:
      return DeviceEnum.WEB;
    case DeviceEnum.OTHER:
      return DeviceEnum.OTHER;
  }
};
