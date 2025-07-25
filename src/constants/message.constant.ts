export const MessageConstant = {
  // ! COMMON
  INTERNAL_SERVER_ERROR: 'Oops! Something went wrong',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  BAD_REQUEST: 'Bad Request',
  INVALID_UUID: 'Invalid UUID',
  INVALID_FIELD: 'Invalid field',

  // ! AUTH
  TOKEN_EXPIRED: 'Token is expired',
  SESSION_EXPIRED: 'Session expired',
  TOKEN_INVALID: 'Token is invalid',
  TOKEN_CREATED: 'Token has been created',
  TOKEN_FAILED: 'Token failed',

  // ! FILE
  FILE_SIZE_TOO_LARGE: 'File size is too large (max 10MB)',
  FILE_TYPE_NOT_SUPPORTED: 'File type is not supported',
  FILE_UPLOAD_SUCCESS: 'File uploaded successfully',
  FILE_UPLOAD_FAILED: 'File uploaded failed',
  FILE_DELETE_SUCCESS: 'File deleted successfully',
  FILE_DELETE_FAILED: 'File deleted failed',
  FILE_GET_SUCCESS: 'Get file successfully',
  FILE_GET_FAILED: 'Get file failed',

  // ! REGISTER
  REGISTER_SUCCESS: 'Register successfully',
  REGISTER_FAILED: 'Register failed',

  // ! LOGIN
  LOGIN_SUCCESS: 'Login successfully',
  LOGIN_FAILED: 'Login failed',
  LOGOUT_SUCCESS: 'Logout successfully',

  // ! EMAIL
  EMAIL_VERIFIED: 'Email is verified',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_OR_PASSWORD_INCORRECT: 'Email or password is incorrect',
  EMAIL_NOT_VERIFIED: 'Email is not verified',

  //! User
  USER_NOT_FOUND: 'User not found',
  USER_NOT_CREATED: 'User not created',
  USER_NOT_UPDATED: 'User not updated',
  GET_USER_SUCCESS: 'Get user successfully',
  USER_EXIST: 'User already exists',
};
