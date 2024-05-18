import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { SecureConstant } from 'secure';

@Injectable()
export class TokenService {
  /**
   * Sign a token
   * @param model object
   * @param options jwt.SignOptions
   * @returns token
   */
  public signToken(model: object, options?: jwt.SignOptions) {
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
}
