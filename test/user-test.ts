import 'jest';
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './utils/ruleHelper';
import UserDB from './utils/userDB';
import { User } from '../src/types';
import * as userData from './data/userData';
import { increment } from '../src/config/firebase';

const testName = 'user';
const provider = new FirestoreTestProvider(testName);

describe(testName, () => {
  beforeEach(async () => {
    provider.increment();
    await provider.loadRules();
  });

  describe('User rule tests ', () => {
    test('createUser should be succeeded', async () => {
      const userA = new UserDB('userA', provider);
      await ftest.assertSucceeds(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .set(userData.valid)
      );
    });

    test('createUser should be failed(invalid short name)', async () => {
      const userA = new UserDB('userA', provider);
      await ftest.assertFails(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .set(userData.invalidNameShort)
      );
    });

    test('change profile should be succeeded', async () => {
      const userA = new UserDB('userA', provider);
      await provider
        .getAdminFirestore()
        .collection('users')
        .doc(userA.uid)
        .set(userData.valid);

      await ftest.assertSucceeds(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .update({
            name: 'taro',
            updateTime: ftest.firestore.FieldValue.serverTimestamp()
          })
      );
    });

    test('change profile can not change createTime', async () => {
      const userA = new UserDB('userA', provider);
      await provider
        .getAdminFirestore()
        .collection('users')
        .doc(userA.uid)
        .set(userData.valid);

      await ftest.assertFails(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .update({
            name: 'taro',
            createTime: ftest.firestore.FieldValue.serverTimestamp(),
            updateTime: ftest.firestore.FieldValue.serverTimestamp()
          })
      );
    });
  });

  afterEach(async () => await provider.cleanup());
});
