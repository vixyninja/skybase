export enum DiaryEnum {
  combined = 'combined',
  error = 'error',
  warn = 'warn',
  exceptions = 'exceptions',
  rejections = 'rejections',
}

export const DiaryEnumValue = (val: string): DiaryEnum => {
  switch (val) {
    case DiaryEnum.combined:
      return DiaryEnum.combined;
    case DiaryEnum.error:
      return DiaryEnum.error;
    case DiaryEnum.warn:
      return DiaryEnum.warn;
    case DiaryEnum.exceptions:
      return DiaryEnum.exceptions;
    case DiaryEnum.rejections:
      return DiaryEnum.rejections;
    default:
      return DiaryEnum.combined;
  }
};
