import * as ftest from '@firebase/testing';
import * as fs from 'fs';

export default class FirestoreTestProvider {
  private testNumber = 0;
  private projectName: string;
  private rules: string;

  /**
   * イニシャライザー
   * @param projectName 識別名(!tweetTestやtweet_testのような長い文字を設定するとTimeoutで失敗する)
   * @param rulesFilePath ルールファイル名
   */
  constructor(projectName: string, rulesFilePath = 'firestore.rules') {
    // projectIDはテスト毎に一意である必要がある。
    // https://techlife.cookpad.com/entry/2018/11/05/143000
    this.projectName = projectName + '-' + Date.now();
    this.rules = fs.readFileSync(rulesFilePath, 'utf8');
  }

  increment() {
    this.testNumber++;
  }

  private getProjectID() {
    return [this.projectName, this.testNumber].join('-');
  }

  async loadRules() {
    return ftest.loadFirestoreRules({
      projectId: this.getProjectID(),
      rules: this.rules
    });
  }

  getFirestoreWithAuth(auth?: { [key in 'uid' | 'email']?: string }) {
    return ftest
      .initializeTestApp({
        projectId: this.getProjectID(),
        auth: auth
      })
      .firestore();
  }

  getAdminFirestore() {
    return ftest
      .initializeAdminApp({ projectId: this.getProjectID() })
      .firestore();
  }

  async cleanup() {
    return Promise.all(ftest.apps().map(app => app.delete()));
  }
}
