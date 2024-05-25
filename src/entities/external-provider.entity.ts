import {BaseEntity} from '@/base';
import {ProviderEnum} from '@/enums';
import {Column, Entity} from 'typeorm';

@Entity({
  name: 'external_provider',
  orderBy: {
    createdAt: 'DESC',
  },
  comment: 'Table for external provider entity',
})
export class ExternalProviderEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Provider name',
  })
  name: string;

  @Column({
    name: 'provider',
    type: 'enum',
    enum: ProviderEnum,
    nullable: false,
    comment: 'Provider type',
  })
  provider: ProviderEnum;

  @Column({
    name: 'is_enabled',
    type: 'boolean',
    nullable: false,
    comment: 'Is provider enabled',
  })
  isEnabled: boolean;

  constructor(partial: Partial<ExternalProviderEntity>) {
    super();
    Object.assign(this, partial);
  }
}
