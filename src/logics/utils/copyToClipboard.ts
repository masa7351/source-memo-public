// クリップボードにコピー
// https://qiita.com/simiraaaa/items/2e7478d72f365aa48356
export const copyToClipboard = (text: string): boolean => {
  var temp = document.createElement('textarea');

  temp.value = text;
  temp.selectionStart = 0;
  temp.selectionEnd = temp.value.length;

  var s = temp.style;
  s.position = 'fixed';
  s.left = '-100%';

  document.body.appendChild(temp);
  temp.focus();
  var result = document.execCommand('copy');
  temp.blur();
  document.body.removeChild(temp);
  // true なら実行できている falseなら失敗か対応していないか
  return result;
};
