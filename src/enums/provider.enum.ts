export enum ProviderEnum {
  GOOGLE = 'google',
  EMAIL = 'email',
  UNKNOWN = 'unknown',
}

export const ProviderValue = (val: string): ProviderEnum => {
  switch (val) {
    case ProviderEnum.GOOGLE:
      return ProviderEnum.GOOGLE;
    case ProviderEnum.EMAIL:
      return ProviderEnum.EMAIL;
    default:
      return ProviderEnum.UNKNOWN;
  }
};
