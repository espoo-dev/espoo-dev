import { useEffect, useRef } from 'react';

export const useUpdateEffect = (
  callback: (...args: []) => void,
  dependencies: Array<unknown>
) => {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return undefined;
    }

    return callback();
  }, dependencies);
};
