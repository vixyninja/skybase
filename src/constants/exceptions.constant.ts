export abstract class ExceptionsConstraint {
  static ENTITY_NOT_FOUND: string = 'ENTITY_NOT_FOUND';
  static ENTITY_ALREADY_EXISTS: string = 'ENTITY_ALREADY_EXISTS';
  static INVALID_PERMISSION: string = 'INVALID_PERMISSION';
  static INVALID_ROLE: string = 'INVALID_ROLE';
  static QUERY_FAILED: string = 'QUERY_FAILED';
  static FILE_UPLOAD_FAILED: string = 'FILE_UPLOAD_FAILED';
  static FILE_DELETE_FAILED: string = 'FILE_DELETE_FAILED';
  static FILE_SIZE_BIG: string = 'FILE_SIZE_BIG';
  static CREDENTIAL_NOT_CORRECT: string = 'CREDENTIAL_NOT_CORRECT';
  static UNAUTHORIZED: string = 'UNAUTHORIZED';
}
