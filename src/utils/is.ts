const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
}

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

export const isString = (val: unknown): val is String => {
  return is(val, 'String')
}

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

export const isEmpty = <T = unknown>(val: T) => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }
}

export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date')
}

export const isNull = (val: unknown): val is null => {
  return val === null
}

export const isNullAndUndef = (val: unknown): val is null | undefined => {
  return isNull(val) && isUnDef(val)
}

export const isNullOrUndef = (val: unknown): val is null | undefined => {
  return isNull(val) || isUnDef(val)
}

export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}

export const isFunction = (val: unknown): val is Function => {
  return typeof val == 'function'
}

export const isPromise = <T = any>(val: any): val is Promise<T> => {
  return is(val, 'Promise') && isFunction(val.then) && isFunction(val.catch)
}

export const isJsonObjectString = (val: string): val is string => {
  if (!val) {
    return false
  }
  return val.startsWith('{') && val.endsWith('}')
}

export const isBoolean = (val: unknown): val is boolean => {
  return is(val, 'Boolean')
}

export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, 'RegExp')
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'window')
}

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}

export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path: string): boolean => {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
