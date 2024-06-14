import { DependencyList, EffectCallback, useEffect, useRef } from 'react';
import isDeepEqualReact from 'fast-deep-equal/react'


type DepsEqualFnType<TDeps extends DependencyList> = (
  prevDeps: TDeps,
  nextDeps: TDeps,
) => boolean;

const useCustomCompareEffect = <TDeps extends DependencyList>(
  effect: EffectCallback,
  deps: TDeps,
  depsEqual: DepsEqualFnType<TDeps>,
) => {
  const ref = useRef<TDeps | undefined>(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  }

  useEffect(effect, ref.current);
};

export const useDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => {
  useCustomCompareEffect(effect, deps, isDeepEqualReact);
};
