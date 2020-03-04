import 'jest';
import * as ftest from '@firebase/testing';
import { User } from '../../src/types';

export const valid = {
  name: 'John',
  createTime: ftest.firestore.FieldValue.serverTimestamp(),
  updateTime: ftest.firestore.FieldValue.serverTimestamp()
} as User;

export const invalidNameShort = {
  name: '',
  createTime: ftest.firestore.FieldValue.serverTimestamp(),
  updateTime: ftest.firestore.FieldValue.serverTimestamp()
} as User;
