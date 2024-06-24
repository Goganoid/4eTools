export const splitByWords = (text: string, words: string[]) => {
  if(!words.length) return [text];
  const re = new RegExp(`(${words.join('|')})`,'ig');
  return text.split(re);
};
