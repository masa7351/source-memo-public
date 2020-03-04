// https://exhikkii.hatenablog.com/entry/2019/05/01/TypeScript_%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AE%E4%BD%9C%E6%88%90%E3%81%AE%E4%BB%95%E6%96%B9
class ApplicationError implements Error {
  // エラー名を設定
  public name = 'ApplictionError';

  // エラーメッセージを引数にとる
  constructor(public message: string) {
    // consoleがあるかないかを確認しとく
    if (typeof console !== 'undefined') {
      console.log(`name: ${this.name}, message: ${this.message}`);
    }
  }
  //  toStringを適当な形で上書きしておく
  toString() {
    return `${this.name} ${this.message}`;
  }
}

export class AuthError extends ApplicationError {
  public name = 'AuthError';
}
