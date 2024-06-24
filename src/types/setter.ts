import { type Dispatch, type SetStateAction } from 'react';

export type ValueProperty<Name extends string, S> = {
  [K in Name]: S;
};

export type DispatchProperty<Name extends string, S> = {
  [K in `set${Capitalize<Name>}`]: Dispatch<SetStateAction<S>>;
};

/**
 * Defines a type with 'property' and 'setProperty' fields
 */
export type Setter<Name extends string, S> = ValueProperty<Name, S> & DispatchProperty<Name, S>;