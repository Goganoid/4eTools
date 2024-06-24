import React, { useMemo } from 'react';
import { Text, type TextProps } from 'react-native-paper';
import { splitByWords } from '../../helpers/splitByWords';
import { escapeRegExp } from 'lodash';

interface HightlightedTextProps extends Omit<TextProps<any>, 'children'> {
  text: string;
  words?: string[] | null;
}

export const HightlightedText = ({
  text,
  words,
  ...textProps
}: HightlightedTextProps) => {
  const highlightedStyle = {
    ...((textProps.style as object) ?? {}),
    color: 'yellow',
  };
  if (!words) return <Text {...textProps}>{text}</Text>;
  const wordsRegex = useMemo(() => {
    if (!words || !words.length) return null;
    const escaped = words.map(w => escapeRegExp(w));
    return new RegExp(escaped.join('|'), 'i');
  }, [words]);

  const splitText = useMemo(() => splitByWords(text, words), [text, words]);
  return (
    <Text>
      {splitText.map((part, idx) => {
        const highlight = wordsRegex?.test(part);
        if (highlight) {
          return (
            <Text {...textProps} style={highlightedStyle} key={idx}>
              {part}
            </Text>
          );
        }
        return (
          <Text {...textProps} key={idx}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
};
