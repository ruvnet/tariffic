# Caching Strategy

## Overview
The application needs a robust caching system to store LLM-generated content for subsequent users, reducing API calls and improving performance.

## Current Implementation
- In-memory Map storage
- 1-hour TTL (Time To Live)
- Singleton pattern
- Resets on server restart
- No persistence between sessions
- No sharing between users

## Proposed Solution

### Client-Side Caching
1. **LocalStorage Cache**
   - Store LLM responses in browser localStorage
   - Set appropriate cache keys based on query parameters
   - Implement TTL management
   - Handle storage limits

2. **Cache Structure**
```typescript
interface CacheItem<T> {
  value: T;
  timestamp: number;
  version: string;  // For cache invalidation
}
```

### Server-Side Caching (Future Enhancement)
1. **Redis/Memcached Integration**
   - Persistent cache storage
   - Shared across all users
   - Configurable TTL
   - Cache invalidation strategy

2. **Cache Keys**
   - Category insights: `category_insights_{category_name}`
   - Company details: `company_details_{company_name}_{sector}`
   - Product descriptions: `product_description_{product_name}_{category}`
   - Sector overviews: `sector_overview_{sector_name}`

### Implementation Steps
1. Create a new `PersistentCache` class that:
   - Uses localStorage for client-side persistence
   - Implements versioning for cache invalidation
   - Handles storage limits and cleanup
   - Provides fallback to memory cache

2. Update the cache interface:
```typescript
interface ICache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  has(key: string): Promise<boolean>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

3. Implement storage adapters:
```typescript
interface StorageAdapter {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### Cache Invalidation Strategy
1. **Version-based invalidation**
   - Each cache entry includes a version number
   - Version is incremented when data structure changes
   - Old versions are automatically invalidated

2. **TTL-based expiration**
   - Default TTL: 1 hour
   - Configurable per cache entry type
   - Automatic cleanup of expired entries

3. **Storage Limits**
   - Monitor localStorage usage
   - Implement LRU (Least Recently Used) eviction
   - Fallback to memory cache when localStorage is full

### Error Handling
1. **Storage Failures**
   - Handle QuotaExceededError
   - Implement fallback mechanisms
   - Log storage errors

2. **Cache Misses**
   - Graceful degradation to API calls
   - Background refresh of expired cache entries
   - Rate limiting for API calls

### Monitoring
1. **Cache Statistics**
   - Hit/miss ratios
   - Storage usage metrics
   - API call reduction metrics

2. **Performance Metrics**
   - Cache read/write latency
   - API response times
   - Storage cleanup duration

## Benefits
1. Reduced API costs
2. Improved response times
3. Better user experience
4. Reduced server load
5. Shared knowledge base across users

## Next Steps
1. Switch to code mode to implement the new caching system
2. Add monitoring and metrics collection
3. Implement server-side caching integration
4. Add cache warming for popular queries
5. Implement advanced cache invalidation strategies