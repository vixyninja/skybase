import * as fs from 'fs';
import * as crypto from 'node:crypto';
import * as path from 'node:path';

const FOLDER_NAME = 'secure';

/**
 *
 * @param name folder name
 */
function checkExistFolder(name: string) {
  const check_path = path.join(__dirname, `${name}`);
  if (!fs.existsSync(check_path)) {
    fs.mkdir(check_path, (err) => console.log(err));
  }
}

/**
 *
 * @returns access token key pair
 */
function getAccessTokenKeyPair(): {
  access_token_private_key_content: string;
  access_token_public_key_content: string;
} {
  checkExistFolder(FOLDER_NAME);

  // Path to access token key pair
  const access_token_private_key_path = path.join(__dirname, 'secure/access_token_private_key.key');
  const access_token_public_key_path = path.join(__dirname, 'secure/access_token_public_key.key');

  // Check if the key pair exists or not
  const access_token_private_key = fs.existsSync(access_token_private_key_path);
  const access_token_public_key = fs.existsSync(access_token_public_key_path);

  // If the key pair does not exist, create a new one
  if (!access_token_private_key || !access_token_public_key) {
    const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {type: 'spki', format: 'pem'},
      privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
      publicExponent: 0x10001,
    });
    fs.writeFileSync(access_token_private_key_path, privateKey);
    fs.writeFileSync(access_token_public_key_path, publicKey);
  }

  // Read the key pair
  const access_token_private_key_content = fs.readFileSync(access_token_private_key_path, 'utf-8');
  const access_token_public_key_content = fs.readFileSync(access_token_public_key_path, 'utf-8');

  // Return the key pair
  return {access_token_private_key_content, access_token_public_key_content};
}

/**
 *
 * @returns refresh token key pair
 */
function getRefreshTokenKeyPair(): {
  refresh_token_private_key_content: string;
  refresh_token_public_key_content: string;
} {
  checkExistFolder(FOLDER_NAME);

  // Path to refresh token key pair
  const refresh_token_private_key_path = path.join(__dirname, 'secure/refresh_token_private_key.key');
  const refresh_token_public_key_path = path.join(__dirname, 'secure/refresh_token_public_key.key');

  // Check if the key pair exists or not
  const refresh_token_private_key = fs.existsSync(refresh_token_private_key_path);
  const refresh_token_public_key = fs.existsSync(refresh_token_public_key_path);

  // If the key pair does not exist, create a new one
  if (!refresh_token_private_key || !refresh_token_public_key) {
    const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {type: 'spki', format: 'pem'},
      privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
      publicExponent: 0x10001,
    });
    fs.writeFileSync(refresh_token_private_key_path, privateKey);
    fs.writeFileSync(refresh_token_public_key_path, publicKey);
  }

  // Read the key pair
  const refresh_token_private_key_content = fs.readFileSync(refresh_token_private_key_path, 'utf-8');
  const refresh_token_public_key_content = fs.readFileSync(refresh_token_public_key_path, 'utf-8');

  // Return the key pair
  return {refresh_token_private_key_content, refresh_token_public_key_content};
}

/**
 *
 * @returns secret key
 */
function getSecretKey(): string {
  checkExistFolder(FOLDER_NAME);

  // Path to secret key
  const secret_key_path = path.join(__dirname, 'secure/secret.key');

  // Check if the secret key exists or not
  const secret_key = fs.existsSync(secret_key_path);

  // If the secret key does not exist, create a new one
  if (!secret_key) {
    const secret = crypto.randomBytes(32).toString('hex');
    fs.writeFileSync(secret_key_path, secret);
  }

  // Read the secret key
  return fs.readFileSync(secret_key_path, 'utf-8');
}

export const SecureConstant = {
  ACCESS_TOKEN_PUBLIC: getAccessTokenKeyPair().access_token_public_key_content,
  REFRESH_TOKEN_PUBLIC: getRefreshTokenKeyPair().refresh_token_public_key_content,
  ACCESS_TOKEN_PRIVATE: getAccessTokenKeyPair().access_token_private_key_content,
  REFRESH_TOKEN_PRIVATE: getRefreshTokenKeyPair().refresh_token_private_key_content,
  SECRET: getSecretKey(),
};
