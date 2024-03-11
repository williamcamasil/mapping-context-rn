import { useEffect } from 'react';

import emitter from './emitter';

const useSubscribe = (
  eventType: string,
  callback: (...args: any[]) => void,
) => {
  useEffect(() => {
    emitter.addListener(eventType, callback);

    return () => {
      emitter.removeListener(eventType, callback);
    };
  }, [eventType, callback]);
};

export default useSubscribe;
