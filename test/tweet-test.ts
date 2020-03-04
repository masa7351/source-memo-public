import 'jest';
import * as ftest from '@firebase/testing';
import FirestoreTestProvider from './utils/ruleHelper';
import UserDB from './utils/userDB';
import * as tweetData from './data/tweetData';

const testName = 'tweet';
const provider = new FirestoreTestProvider(testName);

describe(testName, () => {
  beforeEach(async () => {
    provider.increment();
    await provider.loadRules();
  });

  describe('Tweet rule tests (create)', () => {
    test('create tweet should be succeeded', async () => {
      const userA = new UserDB('userA', provider);
      await ftest.assertSucceeds(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .collection('tweets')
          .add(tweetData.valid(userA))
      );
    });

    test('create tweet content length is over 10 characters', async () => {
      const userA = new UserDB('userA', provider);
      await ftest.assertFails(
        userA.db
          .collection('users')
          .doc(userA.uid)
          .collection('tweets')
          .add(tweetData.textEmpty(userA))
      );
    });
  });

  describe('Tweet rule tests (update)', () => {
    test('update tweet should be succeeded (author update) ', async () => {
      const userA = new UserDB('userA', provider);

      const tweetRef: ftest.firestore.DocumentReference = await userA.db
        .collection('users')
        .doc(userA.uid)
        .collection('tweets')
        .add(tweetData.valid(userA));

      await ftest.assertSucceeds(
        tweetRef.update({
          content: 'tweet content is changed',
          updateTime: ftest.firestore.FieldValue.serverTimestamp()
        })
      );
    });

    // author update case
    test('update tweet need to updateTime (author update) ', async () => {
      const userA = new UserDB('userA', provider);

      const tweetRef: ftest.firestore.DocumentReference = await userA.db
        .collection('users')
        .doc(userA.uid)
        .collection('tweets')
        .add(tweetData.valid(userA));

      await ftest.assertFails(
        tweetRef.update({
          content: 'tweet content is changed'
        })
      );
    });

    // author update case
    test('update tweet can not change createTime (author update)', async () => {
      const userA = new UserDB('userA', provider);

      const tweetRef: ftest.firestore.DocumentReference = await userA.db
        .collection('users')
        .doc(userA.uid)
        .collection('tweets')
        .add(tweetData.valid(userA));

      await ftest.assertFails(
        tweetRef.update({
          content: 'tweet content is changed',
          createTime: ftest.firestore.FieldValue.serverTimestamp()
        })
      );
    });

    // guest update cases
    test('update tweet can not change content (guest update) ', async () => {
      const userA = new UserDB('userA', provider);

      const tweetRef: ftest.firestore.DocumentReference = await userA.db
        .collection('users')
        .doc(userA.uid)
        .collection('tweets')
        .add(tweetData.valid(userA));

      const userB = new UserDB('userB', provider);

      await ftest.assertFails(
        userB.db
          .collection('users')
          .doc(userA.uid)
          .collection('tweets')
          .doc(tweetRef.id)
          .update({
            content: 'tweet content is changed'
          })
      );
    });
  });

  afterEach(async () => await provider.cleanup());
});
