export interface Store<K, REF, R> {
    get<R>(key:K):R;
    store(value: REF): R;
}