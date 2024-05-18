import * as fs from 'fs';
import * as crypto from 'node:crypto';
import * as path from 'node:path';

function checkExistFolder(name: string) {
  const check_path = path.join(__dirname, `../../${name}`);
  if (!fs.existsSync(check_path)) {
    fs.mkdir(check_path, (err) => console.log(err));
  }
}

function getAccessTokenKeyPair(): {
  access_token_private_key_content: string;
  access_token_public_key_content: string;
} {
  checkExistFolder('secure');
  const access_token_private_key_path = path.join(__dirname, '../../secure/access_token_private_key.key');
  const access_token_public_key_path = path.join(__dirname, '../../secure/access_token_public_key.key');
  const access_token_private_key = fs.existsSync(access_token_private_key_path);
  const access_token_public_key = fs.existsSync(access_token_public_key_path);
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
  const access_token_private_key_content = fs.readFileSync(access_token_private_key_path, 'utf8');
  const access_token_public_key_content = fs.readFileSync(access_token_public_key_path, 'utf8');
  return {access_token_private_key_content, access_token_public_key_content};
}

function getRefreshTokenKeyPair(): {
  refresh_token_private_key_content: string;
  refresh_token_public_key_content: string;
} {
  checkExistFolder('secure');
  const refresh_token_private_key_path = path.join(__dirname, '../../secure/refresh_token_private_key.key');
  const refresh_token_public_key_path = path.join(__dirname, '../../secure/refresh_token_public_key.key');
  const refresh_token_private_key = fs.existsSync(refresh_token_private_key_path);
  const refresh_token_public_key = fs.existsSync(refresh_token_public_key_path);
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
  const refresh_token_private_key_content = fs.readFileSync(refresh_token_private_key_path, 'utf8');
  const refresh_token_public_key_content = fs.readFileSync(refresh_token_public_key_path, 'utf8');
  return {refresh_token_private_key_content, refresh_token_public_key_content};
}

export const JWT_CONSTANT = {
  ACCESS_TOKEN_KEY_PAIR: getAccessTokenKeyPair(),
  REFRESH_TOKEN_KEY_PAIR: getRefreshTokenKeyPair(),
};
