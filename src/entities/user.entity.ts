import {BaseEntity} from '@/base';
import {ProviderEnum, UserStatusEnum} from '@/enums';
import {compareHash} from '@/utils';
import {Column, Entity, Index} from 'typeorm';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'DESC',
  },
  // comment: 'Table for user entity',
})
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
    default: null,
    name: 'first_name',
    comment: 'First name for user',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
    default: null,
    name: 'last_name',
    comment: 'Last name for user',
  })
  lastName: string;

  @Index('IDX_USER_EMAIL', {unique: true, where: 'deleted_at IS NULL'})
  @Column({
    type: 'varchar',
    length: 225,
    nullable: false,
    name: 'email',
    comment: 'Email for user',
  })
  email: string;

  @Index('IDX_USER_PHONE', {unique: true, where: 'deleted_at IS NULL'})
  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    default: null,
    name: 'phone_number',
    comment: 'Phone number for user',
  })
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.INACTIVE,
    name: 'status',
    comment: 'Status of user (active, inactive, blocked)',
  })
  status: UserStatusEnum;

  @Column({
    type: 'enum',
    enum: ProviderEnum,
    nullable: false,
    name: 'provider',
    comment: 'Provider of user (email, facebook, google, etc)',
  })
  provider: ProviderEnum;

  @Column({
    type: 'varchar',
    length: 225,
    default: null,
    name: 'device_token',
    comment: 'Device token for push notification',
  })
  deviceToken: string;

  @Column({
    type: 'varchar',
    length: 225,
    nullable: false,
    select: false,
    name: 'password',
    comment: 'Password for user (hash with bcrypt)',
  })
  password: string;

  // ! ############################# RELATION #############################
  // @JoinColumn({
  //   foreignKeyConstraintName: 'FK_USER_AVATAR',
  //   name: 'avatar',
  //   referencedColumnName: 'uuid',
  // })
  // @OneToOne(() => MediaEntity, (media) => media.uuid, {
  //   cascade: true,
  //   nullable: true,
  //   eager: true,
  //   lazy: false,
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // avatar: MediaEntity;

  // @JoinColumn({
  //   foreignKeyConstraintName: 'FK_USER_BACKGROUND',
  //   name: 'background',
  //   referencedColumnName: 'uuid',
  // })
  // @OneToOne(() => MediaEntity, (media) => media.uuid, {
  //   cascade: true,
  //   nullable: true,
  //   eager: true,
  //   lazy: false,
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // background: MediaEntity;

  // * ############################# METHOD #############################
  comparePassword(attempt: string): boolean {
    return compareHash(attempt, this.password);
  }

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
