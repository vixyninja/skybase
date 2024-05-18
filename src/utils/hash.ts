import * as bycryptjs from 'bcryptjs';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password: string): string {
  const saltRounds = bycryptjs.genSaltSync(10);
  return saltRounds && bycryptjs.hashSync(password, saltRounds);
}

/**
 * compare password or string with hash
 * @param {string} password
 * @param {string} hash
 * @returns {boolean}
 */
export function compareHash(password: string, hash: string): boolean {
  return bycryptjs.compareSync(password, hash);
}
