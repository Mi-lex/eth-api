export const BigIntMath = {
  abs(x: bigint) {
    return x < 0n ? -x : x;
  },
  min(value: bigint, ...values: bigint[]) {
    for (const v of values) if (v < value) value = v;
    return value;
  },
  max(value: bigint, ...values: bigint[]) {
    for (const v of values) if (v > value) value = v;
    return value;
  },
};
