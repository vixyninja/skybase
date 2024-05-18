import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {MongooseModuleOptions} from '@nestjs/mongoose';
import {TypeOrmModuleOptions} from '@nestjs/typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: ConfigService) {}

  /**
   *
   * @returns {string} The current node environment
   * @description This method returns the current node environment
   */
  public nodeENV(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  /**
   *
   * @returns {number} The current port
   * @description This method returns the current port
   */
  public port(): number {
    return this.configService.get<number>('PORT');
  }

  /**
   *
   * @returns {string} The current version
   * @description This method returns the current version
   */
  public version(): string {
    return this.configService.get<string>('VERSION');
  }

  /**
   *
   * @returns {string} The current group email
   * @description This method returns the current group email
   */
  public groupEmail(): string {
    return this.configService.get<string>('GROUP_EMAIL');
  }

  /**
   *
   * @returns {string} The current redis host
   * @description This method returns the current redis host
   */
  public redisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  /**
   *
   * @returns {number} The current redis port
   * @description This method returns the current redis port
   */
  public redisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  /**
   *
   * @returns {number} The current redis TTL
   * @description This method returns the current redis TTL
   */
  public redisTTL(): number {
    return this.configService.get<number>('REDIS_TTL') as number;
  }

  /**
   *
   * @returns {number} The current throttle TTL
   * @description This method returns the current throttle TTL
   */
  public throttleTTL(): number {
    return this.configService.get<number>('THROTTLE_TTL') as number;
  }

  /**
   *
   * @returns {number} The current throttle limit
   * @description This method returns the current throttle limit
   */
  public throttleLimit(): number {
    return this.configService.get<number>('THROTTLE_LIMIT') as number;
  }

  /**
   *
   * @returns {TypeOrmModuleOptions} The current postgres connection
   * @description This method returns the current postgres connection
   */
  public postgresConnection(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('POSTGRES_HOST'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get<string>('POSTGRES_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      useUTC: true,
      autoLoadEntities: true,
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      entityPrefix: 'tbl_',
      connectTimeoutMS: 30000,
    };
  }

  /**
   *
   * @returns {MongooseModuleOptions} The current mongo connection
   * @description This method returns the current mongo connection
   */
  public mongoConnection(): MongooseModuleOptions {
    return {
      dbName: this.configService.get<string>('MONGO_NAME'),
      retryWrites: true,
      w: 'majority',
      user: this.configService.get<string>('MONGO_USER_NAME'),
      pass: this.configService.get<string>('MONGO_USER_PASS'),
      uri: `mongodb://${this.configService.get<string>('MONGO_HOST')}:${this.configService.get<string>('MONGO_PORT')}`,
    };
  }

  /**
   *
   * @returns {Object} The current JWT secret key
   * @description This method returns the current JWT secret key
   */
  public jwtSecret(): {publicKey: string; privateKey: string; secret: string} {
    return {
      publicKey: this.configService.get<string>('PUBLIC_KEY'),
      privateKey: this.configService.get<string>('PRIVATE_KEY'),
      secret: this.configService.get<string>('SECRET_KEY'),
    };
  }

  /**
   *
   * @returns {string} The current JWT issuer
   * @description This method returns the current JWT issuer
   */
  public algorithm(): string {
    return this.configService.get<string>('ALGORITHM');
  }

  /**
   *
   * @returns {Object} The current JWT expires in
   * @description This method returns the current JWT expires in
   */
  public tokenExpiresIn(): {accessTokenExpiresIn: string; refreshTokenExpiresIn: string} {
    return {
      accessTokenExpiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
      refreshTokenExpiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
    };
  }

  /**
   *
   * @returns {Object} The current cloudinary config
   * @description This method returns the current cloudinary config
   */
  public cloudinaryConfig(): {cloudName: string; apiKey: string; apiSecret: string; secure: boolean; folder: string} {
    return {
      cloudName: this.configService.get<string>('CLOUD_NAME'),
      apiKey: this.configService.get<string>('CLOUD_API_KEY'),
      apiSecret: this.configService.get<string>('CLOUD_API_SECRET'),
      secure: true,
      folder: this.configService.get<string>('FOLDER_NAME'),
    };
  }
}
