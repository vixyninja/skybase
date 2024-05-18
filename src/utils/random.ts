import {uid} from 'uid/single';

/**
 * Generate a random OTP
 * @param length - Length of the OTP
 * @returns {string}
 * @example
 * ```
 * randomOTP(6);
 * ```
 */
export const randomOTP = (length: number = 6): string => {
  return uid(length);
};
