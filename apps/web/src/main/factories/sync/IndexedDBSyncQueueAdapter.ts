import { IndexedDBSyncQueueAdapter } from "@/infra/sync/IndexedDBSyncQueueAdapter";

export const createIndexedDBSyncQueueAdapter = () => new IndexedDBSyncQueueAdapter()