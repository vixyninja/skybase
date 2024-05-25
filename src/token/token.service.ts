import {ConfigsService} from '@/configs';
import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from 'jsonwebtoken';
import * as crypto from 'node:crypto';
import {SecureConstant} from 'secure';
@Injectable()
export class TokenService {
  constructor(private readonly configsService: ConfigsService) {}

  /**
   * Generate a salt
   * @returns salt string
   */
  public generateSalt(): Promise<string> {
    return bcrypt.genSalt();
  }

  /**
   * Hash a payload
   * @param payload string
   * @param salt string
   * @returns hash string
   */
  public hashPayload(payload: string, salt: string | number): Promise<string> {
    return bcrypt.hash(payload, salt);
  }

  /**
   * Compare a payload with a hash
   * @param payload string
   * @param hash string
   * @returns boolean
   */
  public comparePayload(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }

  /**
   * Sign a token
   * @param model object
   * @param options jwt.SignOptions
   * @returns token
   */
  public signToken(model: object, options?: jwt.SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(model, SecureConstant.SECRET, options, (err: Error, token: string) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  /**
   * Verify a token
   * @param token string
   * @returns jwt.JwtPayload | string
   */
  public verifyToken(token: string): Promise<jwt.JwtPayload | string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SecureConstant.SECRET, (err: jwt.VerifyErrors, decoded: string | jwt.JwtPayload) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }

  /**
   * Decode a token
   * @param token string
   * @returns jwt.JwtPayload | string
   */
  public decodeToken(token: string): jwt.JwtPayload | string {
    return new Promise((resolve, reject) => {
      const decoded = jwt.decode(token, {complete: true});
      if (decoded) {
        resolve(decoded);
      } else {
        reject();
      }
    });
  }

  /**
   * Sign a token with asymmetric key pair
   * @param model object
   * @param secretOrPrivateKey jwt.Secret
   * @param options jwt.SignOptions
   * @returns token
   */
  public signAsymmetricToken(model: object, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions) {
    return new Promise((resolve, reject) => {
      jwt.sign(model, secretOrPrivateKey, options, (err: Error, token: string) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  /**
   * Verify a token with asymmetric key pair
   * @param token string
   * @param secretOrPublicKey jwt.Secret
   * @param options jwt.VerifyOptions
   * @returns jwt.JwtPayload | string
   */
  public verifyAsymmetricToken(
    token: string,
    secretOrPublicKey: jwt.Secret,
    options?: jwt.VerifyOptions,
  ): Promise<jwt.JwtPayload | string> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretOrPublicKey, options, (err: jwt.VerifyErrors, decoded: string | JwtPayload) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }

  /**
   * Generate a key pair
   * @returns Promise<{privateKey: string; publicKey: string}>
   */
  public generateKeyPair(): Promise<{privateKey: string; publicKey: string}> {
    return new Promise((resolve, reject) => {
      crypto.generateKeyPair(
        'rsa',
        {
          modulusLength: 4096,
          publicKeyEncoding: {type: 'spki', format: 'pem'},
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            passphrase: this.configsService.passPhrase(),
            cipher: 'aes-192-cbc',
          },
          publicExponent: 0x10001,
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          }
          resolve({privateKey, publicKey});
        },
      );
    });
  }

  /**
   * Generate a secret key
   * @returns string
   */
  public generateSecretKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
