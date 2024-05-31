import {BaseEntity} from '@/base';
import {UserStatusEnum} from '@/enums';
import {Column, Entity, Index, JoinColumn, OneToOne} from 'typeorm';
import {CredentialEntity} from './credential.entity';
import {FileEntity} from './file.entity';

@Entity({
  name: 'user',
  orderBy: {
    createdAt: 'DESC',
  },
  comment: 'Table for user entity',
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

  @Index('idx_user_email', {unique: true, where: 'deleted_at IS NULL'})
  @Column({
    type: 'varchar',
    length: 225,
    nullable: true,
    default: null,
    name: 'email',
    comment: 'Email for user',
  })
  email: string;

  @Index('idx_user_phone', {unique: true, where: 'deleted_at IS NULL'})
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
    name: 'last_ip',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Last IP address',
  })
  lastIp: string;

  @Column({
    name: 'last_login',
    type: 'timestamp without time zone',
    nullable: true,
    comment: 'Last login',
  })
  lastLogin: Date;

  @Column({
    name: 'is_online',
    type: 'boolean',
    nullable: false,
    comment: 'Is online',
    default: false,
  })
  isOnline: boolean;

  // ! ############################# RELATION #############################
  @JoinColumn({
    foreignKeyConstraintName: 'fk_user_avatar',
    name: 'avatar',
    referencedColumnName: 'uuid',
  })
  @OneToOne(() => FileEntity, (media) => media.uuid, {
    cascade: true,
    nullable: true,
    eager: true,
    lazy: false,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  avatar: FileEntity;

  @JoinColumn({
    foreignKeyConstraintName: 'fk_user_background',
    name: 'background',
    referencedColumnName: 'uuid',
  })
  @OneToOne(() => FileEntity, (media) => media.uuid, {
    cascade: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  background: FileEntity;

  @OneToOne(() => CredentialEntity, (credential) => credential.uuid, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  credential: CredentialEntity;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
