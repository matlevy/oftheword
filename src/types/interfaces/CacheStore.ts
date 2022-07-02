export interface CacheStore<K, V> {
    get<R>(key:K):R;
    store<R>(value: V): R;
}