import {Module} from '@nestjs/common';
import * as admin from 'firebase-admin';
import {FIREBASE_PROVIDER} from 'src/constants';

const serviceAccount = require('../../../../serviceAccountKey.json');

const firebaseConfig = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Module({
  providers: [
    {
      provide: FIREBASE_PROVIDER,
      useValue: firebaseConfig,
    },
  ],
  exports: [
    {
      provide: FIREBASE_PROVIDER,
      useValue: firebaseConfig,
    },
  ],
})
export class FirebaseModule {}
