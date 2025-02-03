interface CacheStats {
  totalItems: number;
  totalSize: number;
  hitRate: number;
  missRate: number;
  avgResponseTime: number;
}

class PersistentCache {
  private hits: number = 0;
  private misses: number = 0;
  private totalResponseTime: number = 0;
  private totalRequests: number = 0;

  async get<T>(key: string): Promise<T | null> {
    const startTime = performance.now();
    
    try {
      const item = localStorage.getItem(key);
      
      if (!item) {
        this.misses++;
        this.totalRequests++;
        return null;
      }

      const { value, timestamp, version } = JSON.parse(item);
      
      // Check if the item has expired (1 hour TTL)
      if (Date.now() - timestamp > 60 * 60 * 1000) {
        localStorage.removeItem(key);
        this.misses++;
        this.totalRequests++;
        return null;
      }

      // Version check (for future use)
      if (version !== '1.0') {
        localStorage.removeItem(key);
        this.misses++;
        this.totalRequests++;
        return null;
      }

      this.hits++;
      this.totalRequests++;
      const endTime = performance.now();
      this.totalResponseTime += endTime - startTime;

      return value as T;
    } catch (e) {
      console.error('Cache retrieval error:', e);
      this.misses++;
      this.totalRequests++;
      return null;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    const startTime = performance.now();
    
    try {
      const item = {
        value,
        timestamp: Date.now(),
        version: '1.0'
      };
      
      localStorage.setItem(key, JSON.stringify(item));
      
      const endTime = performance.now();
      this.totalResponseTime += endTime - startTime;
      this.totalRequests++;
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        // If storage is full, clear old items
        this.clearOldItems();
        // Try setting the item again
        await this.set(key, value);
      } else {
        console.error('Cache set error:', e);
        throw e;
      }
    }
  }

  async delete(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    this.hits = 0;
    this.misses = 0;
    this.totalResponseTime = 0;
    this.totalRequests = 0;
    localStorage.clear();
  }

  async has(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }

  private clearOldItems(): void {
    const keys = Object.keys(localStorage);
    const items = keys.map(key => {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      try {
        const { timestamp } = JSON.parse(item);
        return { key, timestamp };
      } catch {
        return null;
      }
    }).filter((item): item is { key: string; timestamp: number } => item !== null);

    // Sort by timestamp (oldest first)
    items.sort((a, b) => a.timestamp - b.timestamp);

    // Remove oldest 20% of items
    const itemsToRemove = Math.ceil(items.length * 0.2);
    items.slice(0, itemsToRemove).forEach(item => {
      localStorage.removeItem(item.key);
    });
  }

  async getStats(): Promise<CacheStats> {
    const totalItems = localStorage.length;
    let totalSize = 0;

    // Calculate total size of cached items
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        totalSize += localStorage.getItem(key)?.length || 0;
      }
    }

    return {
      totalItems,
      totalSize,
      hitRate: this.totalRequests ? this.hits / this.totalRequests : 0,
      missRate: this.totalRequests ? this.misses / this.totalRequests : 0,
      avgResponseTime: this.totalRequests ? this.totalResponseTime / this.totalRequests : 0
    };
  }
}

export const persistentCache = new PersistentCache();
