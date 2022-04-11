// 自主封装的比较方法，以供调用

function is(x: any, y: any) {
  return (
    (x === y
    && (x !== 0 || 1 / x === 1 / y))
    || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

export const objectIs: (x:any, y: any) => boolean = typeof Object.is === 'function' ? Object.is : is;

const { hasOwnProperty } = Object.prototype;
const { isArray } = Array;

export const isArrayValueEqual = (arrayA: any[], arrayB: any[]): boolean => {
  if (isArray(arrayA) && isArray(arrayB)) {
    if (is(arrayA, arrayB)) {
      return true;
    }

    if (arrayA.length !== arrayB.length) {
      return false;
    }

    if (arrayA.length === 0 && arrayB.length === 0) {
      return true;
    }

    for (let i = 0; i < arrayA.length; i++) {
      const valA = arrayA[i];
      const valB = arrayB[i];

      if (isArray(valA) || isArray(valB)) {
        if (isArrayValueEqual(valA, valB)) {
          return false;
        }
      } else if (!isObjectValueEqual(valA, valB)) {
        return false;
      }
    }

    return true;
  }

  return false;
};

export const isObjectValueEqual = (
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean => {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  if (keysA.length === 0 && keysB.length === 0) {
    return true;
  }

  for (let i = 0; i < keysB.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i])) {
      return false;
    }

    const valA = objA[keysA[i]];
    const valB = objB[keysB[i]];

    if (isArray(valA) || isArray(valB)) {
      if (!isArrayValueEqual(valA as any[], valB as any[])) {
        return false;
      }
    } else if (!isObjectValueEqual(valA as any, valB as any)) {
      return false;
    }
  }
  return true;
};

export const isValueDeepEqual = (objA: any, objB: any): boolean => {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  if (isArray(objA) || isArray(objB)) {
    return isArrayValueEqual(objA, objB);
  }

  return isObjectValueEqual(objA, objB);
};
