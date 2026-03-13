import { SyncEngine } from "@/infra/sync/SyncEngineAdapter";
import { createIndexedDBSyncQueueAdapter } from "./IndexedDBSyncQueueAdapter";
import { createFetchHttpClientAdapter } from "../http/FetchHttpClientAdapterFactory";

export const createSyncEngine = () => new SyncEngine(createIndexedDBSyncQueueAdapter(), createFetchHttpClientAdapter())