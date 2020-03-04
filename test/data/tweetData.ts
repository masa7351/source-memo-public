import 'jest';
import { Tweet } from '../../src/types';
import * as ftest from '@firebase/testing';
import UserDB from '../utils/userDB';

export const valid = (user: UserDB): Tweet =>
  ({
    title: 'Sample text',
    content: 'this is a sample content',
    keyword: 'React',
    author: user.db.collection('users').doc(user.uid),
    userId: user.uid,
    createTime: ftest.firestore.FieldValue.serverTimestamp(),
    updateTime: ftest.firestore.FieldValue.serverTimestamp()
  } as Tweet);

export const textEmpty = (user: UserDB): Tweet =>
  ({
    title: 'Sample title',
    content: '',
    keyword: 'React',
    author: user.db.collection('users').doc(user.uid),
    userId: user.uid,
    createTime: ftest.firestore.FieldValue.serverTimestamp(),
    updateTime: ftest.firestore.FieldValue.serverTimestamp()
  } as Tweet);
