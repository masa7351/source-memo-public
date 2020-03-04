// String extensions
// https://qiita.com/yumechi/items/060969b7ac92a4eb64bd

export {};

declare global {
  interface String {
    decodeLineBreak(): string;
    encodeLineBreak(): string;
  }
}

// eslint-disable-next-line no-extend-native
String.prototype['encodeLineBreak'] = function() {
  return this.replace(/\n/g, '\\n');
};

// eslint-disable-next-line no-extend-native
String.prototype['decodeLineBreak'] = function() {
  return this.replace(/\\n/g, '\n');
};
