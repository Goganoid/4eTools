import { highlightHtmlWords } from './highlightHtml'

describe('highlightHtml', () => {
  it('it should highlight multiple words', () => {
    const result = highlightHtmlWords('abcd test wordtestword cat',['test','cat']);
    expect(result).toBe('abcd <mark>test</mark> word<mark>test</mark>word <mark>cat</mark>')
  });
  it('it should return unchanged string when array is empty', () => {
    const result = highlightHtmlWords('abcd test wordtestword cat',[]);
    expect(result).toBe('abcd test wordtestword cat')
  })
})