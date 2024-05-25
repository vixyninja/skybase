import {BaseEntity} from '@/base';
import {Entity} from 'typeorm';

@Entity({
  name: 'setting',
  orderBy: {
    createdAt: 'DESC',
  },
  comment: 'Table for setting entity',
})
export class SettingEntity extends BaseEntity {
  locale: string;
  timezone: string;
}
