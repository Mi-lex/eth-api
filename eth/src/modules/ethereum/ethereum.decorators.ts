type TimerRef = { current: null | ReturnType<typeof setTimeout> };

// @ts-ignore
export const IntervalBetweenCall = function (intervalMs = 0) {
  const timerIdRef: TimerRef = { current: null };

  return function (
    // @ts-ignore
    proto: any,
    propertyName: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function () {
      const run = async () => {
        try {
          // @ts-ignore
          await originalMethod.call(this);
        } catch (error) {
          console.error(`${propertyName} err: ${error}`);
        } finally {
          timerIdRef.current = setTimeout(run, intervalMs);
        }
      };

      timerIdRef.current = setTimeout(run, intervalMs);
    };

    return descriptor;
  };
};
