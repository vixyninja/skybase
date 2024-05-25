import {BaseEntity} from '@/base';
import {DeviceEnum} from '@/enums';
import {Column, Entity} from 'typeorm';

@Entity({
  name: 'device',
  orderBy: {
    createdAt: 'ASC',
  },
  comment: 'Device table',
})
export class DeviceEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 225,
    default: null,
    name: 'device_token',
    comment: 'Device token for push notification',
  })
  deviceToken: string;

  @Column({
    name: 'device_type',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Device type',
  })
  deviceType: DeviceEnum;

  @Column({
    name: 'device_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Device name',
  })
  deviceName: string;

  @Column({
    name: 'device_model',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Device model',
  })
  deviceModel: string;

  @Column({
    name: 'device_os',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Device OS',
  })
  deviceOs: string;

  @Column({
    name: 'ip',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'IP address',
  })
  ip: string;

  constructor(partial: Partial<DeviceEntity>) {
    super();
    Object.assign(this, partial);
  }
}
