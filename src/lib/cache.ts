interface CacheItem<T> {
  value: T;
  timestamp: number;
}

class Cache {
  private static instance: Cache;
  private storage: Map<string, CacheItem<string>>;
  private readonly TTL = 1000 * 60 * 60; // 1 hour cache TTL

  private constructor() {
    this.storage = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set(key: string, value: string): void {
    this.storage.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  public get(key: string): string | null {
    const item = this.storage.get(key);
    if (!item) return null;

    // Check if the item has expired
    if (Date.now() - item.timestamp > this.TTL) {
      this.storage.delete(key);
      return null;
    }

    return item.value;
  }

  public has(key: string): boolean {
    const item = this.storage.get(key);
    if (!item) return false;

    // Check if the item has expired
    if (Date.now() - item.timestamp > this.TTL) {
      this.storage.delete(key);
      return false;
    }

    return true;
  }

  public delete(key: string): void {
    this.storage.delete(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export const cache = Cache.getInstance();