import {CredentialEntity} from '@/entities';
import {hashPassword} from '@/utils';
import {EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent} from 'typeorm';

@EventSubscriber()
export class CredentialSubscriber implements EntitySubscriberInterface<CredentialEntity> {
  listenTo(): string | Function {
    return CredentialEntity;
  }

  async beforeInsert(event: InsertEvent<CredentialEntity>): Promise<any> {
    if (event.entity.passwordSalt) {
      event.entity.passwordHash = hashPassword(event.entity.passwordHash, event.entity.passwordSalt);
    }
  }

  async beforeUpdate(event: UpdateEvent<CredentialEntity>): Promise<any> {
    const entity = <CredentialEntity>event.entity;
    if (entity.passwordSalt) {
      entity.passwordHash = hashPassword(entity.passwordHash, entity.passwordSalt);
    }
  }
}
