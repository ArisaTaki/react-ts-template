// 跨页面临时存储的数据，需要时再使用

export interface PagesCrossMemory {
  get<T extends {} = any>(key: string) : T | null
  set<T extends {} = any>(key: string, value: T) : void
  remove(key: string) : void
  clear(): void
}

let memoryCache: Record<string, any> = {};

const pagesCrossMemory: PagesCrossMemory = {
  get<T extends {} = any>(key: string) {
    const value = memoryCache[key];
    if (typeof value === 'undefined') return null;
    return value as T;
  },
  set<T extends {} = any>(key: string, value: T) {
    memoryCache[key] = value;
  },

  remove<T extends {} = any>(key: string) {
    delete memoryCache[key];
  },

  clear() {
    memoryCache = {};
  },
};

export default pagesCrossMemory;
