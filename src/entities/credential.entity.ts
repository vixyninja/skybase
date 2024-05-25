import {BaseEntity} from '@/base';
import {Column, Entity} from 'typeorm';

@Entity({
  name: 'credential',
  orderBy: {
    createdAt: 'DESC',
  },
  comment: 'Table for credential entity',
})
export class CredentialEntity extends BaseEntity {
  @Column({
    name: 'login_name',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Login name',
  })
  loginName: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    comment: 'Password hash',
  })
  passwordHash: string;

  @Column({
    name: 'password_salt',
    type: 'varchar',
    nullable: false,
    select: false,
    comment: 'Password salt',
  })
  passwordSalt: string;

  @Column({
    name: 'validation_code',
    type: 'varchar',
    select: false,
    length: 255,
    nullable: false,
    comment: 'Common validation code for password reset, email confirmation, etc.',
  })
  validationCode: string;

  @Column({
    type: 'boolean',
    nullable: false,
    comment: 'Email confirmed',
    default: false,
  })
  email_confirmed: boolean;

  @Column({
    name: 'email_confirmation_code',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    comment: 'Email confirmation code',
  })
  emailConfirmationCode: string;

  @Column({
    name: 'email_confirmation_expires',
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'Email confirmation code expiration',
  })
  emailConfirmationExpires: Date;

  @Column({
    name: 'password_reset_code',
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    comment: 'Password reset code',
  })
  passwordResetCode: string;

  @Column({
    name: 'password_reset_expires',
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'Password reset code expiration',
  })
  passwordResetExpires: Date;

  @Column({
    name: 'login_blocked',
    type: 'boolean',
    nullable: false,
    comment: 'Login blocked',
    default: false,
  })
  loginBlocked: boolean;

  @Column({
    name: 'login_blocked_until',
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'Login blocked until',
  })
  loginBlockedUntil: Date;

  @Column({
    name: 'login_blocked_reason',
    type: 'text',
    nullable: true,
    comment: 'Login blocked reason',
  })
  loginBlockedReason: string;

  @Column({
    name: 'private_key',
    type: 'text',
    nullable: false,
    select: false,
    comment: 'Private key',
  })
  privateKey: string;

  @Column({
    name: 'public_key',
    type: 'text',
    nullable: false,
    select: false,
    comment: 'Public key',
  })
  publicKey: string;

  @Column({
    name: 'secret_key',
    type: 'text',
    nullable: false,
    comment: 'Secret key',
    select: false,
  })
  secretKey: string;

  constructor(partial: Partial<CredentialEntity>) {
    super();
    Object.assign(this, partial);
  }
}
