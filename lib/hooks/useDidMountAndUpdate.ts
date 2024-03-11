import { DependencyList, EffectCallback, useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useDidMountAndUpdate = (callback: EffectCallback, deps?: DependencyList): void => useEffect(callback, deps);

export default useDidMountAndUpdate;
