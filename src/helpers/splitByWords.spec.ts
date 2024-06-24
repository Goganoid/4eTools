import { splitByWords } from './splitByWords';

describe('highlightJsx', () => {
  it('should split words', () => {
    const result = splitByWords('Prerequisite: Eladrin, artificer', [
      'Eladrin',
      'artificer',
    ]);
    expect(result).toStrictEqual([
      'Prerequisite: ',
      'Eladrin',
      ', ',
      'artificer',
      '',
    ]);
  });
  it('should not split with no words', () => {
    const result = splitByWords('Prerequisite: Eladrin, artificer', []);
    expect(result).toStrictEqual(['Prerequisite: Eladrin, artificer']);
  });
});
