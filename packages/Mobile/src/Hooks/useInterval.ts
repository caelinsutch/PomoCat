import { useEffect, useRef, useState } from "react";

type Delay = number | null;
type TimerHandler = (...args: any[]) => void;

/**
 * Provides a declarative useInterval
 *
 * @param callback - Function that will be called every `delay` ms.
 * @param delay - Number representing the delay in ms. Set to `null` to "pause" the interval.
 */

const useInterval = (callback: TimerHandler, delay: Delay) => {
  const [cachedInterval, setCachedInterval] = useState<number | null>(null);
  const savedCallbackRef = useRef<TimerHandler>();

  useEffect(() => {
    savedCallbackRef.current = callback;
  });

  const start = () => {
    const handler = (...args: any[]) => savedCallbackRef.current!(...args);

    const intervalId = setInterval(handler, delay);
    setCachedInterval(intervalId);
  };

  const stop = () => {
    if (cachedInterval) clearInterval(cachedInterval);
    setCachedInterval(null);
  };

  return { start, stop };
};

export default useInterval;
