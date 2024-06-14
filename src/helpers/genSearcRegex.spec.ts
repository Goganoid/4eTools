import { genSearchRegex } from './genSearchRegex';

describe('test', () => {
  it('should work', () => {
    const input = 'aasimar engineer';
    const result = genSearchRegex(input);
    expect(result?.regexp).toStrictEqual(/^(?=.*aasimar.*)(?=.*engineer.*)/i);
  })

  it('should handle quotes', () => {
    const input = 'aasimar "engineer"';
    const result = genSearchRegex(input);
    expect(result?.regexp).toStrictEqual(/^(?=.*aasimar.*)(?=.*engineer.*)/i);
  })

  it('should handle -', () => {
    const input = 'aasimar -engineer';
    const result = genSearchRegex(input);
    expect(result?.regexp).toStrictEqual(/^(?=.*aasimar.*)(?!.*engineer.*)/i);
  })

  it('should handle +', () => {
    const input = 'aasimar +engineer';
    const result = genSearchRegex(input);
    expect(result?.regexp).toStrictEqual(/^(?=.*aasimar.*)(?=.*\bengineer\b.*)/i);
  })

  it('should handle OR', () => {
    const input = 'aasimar OR engineer';
    const result = genSearchRegex(input);
    expect(result?.regexp).toStrictEqual(/^(?:(?=.*aasimar.*)|(?=.*engineer.*))/i);
  })
})