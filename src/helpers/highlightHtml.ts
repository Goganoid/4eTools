export const highlightHtmlWord = (html: string, word: string) => {
  if(!word) return html;
  const re = new RegExp(word, 'gi');
  return html.replace(re, `<mark>$&</mark>`);
};

const highlightHtmlWordsInner = (
  html: string,
  words: string[],
  wordIndex = 0,
): string => {
  if (!words.length) return html;
  const highlighted = highlightHtmlWord(html, words[wordIndex]);
  if (words[wordIndex]) {
    return highlightHtmlWordsInner(highlighted, words, wordIndex + 1);
  }
  return highlighted;
};

export const highlightHtmlWords = (html: string, words: string[]) =>
  highlightHtmlWordsInner(html, words);
