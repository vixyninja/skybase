import {
  BaseEntity as CoreEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  comment: 'Base entity for all entities',
  orderBy: {
    createdAt: 'DESC',
  },
  engine: 'InnoDB',
  name: 'base_entity',
})
export class BaseEntity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'uuid', comment: 'uuid of entity'})
  uuid: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    comment: 'created at of entity',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    comment: 'updated at of entity',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp without time zone',
    name: 'deleted_at',
    select: false,
    comment: 'deleted at of entity',
  })
  deletedAt: Date;
}
