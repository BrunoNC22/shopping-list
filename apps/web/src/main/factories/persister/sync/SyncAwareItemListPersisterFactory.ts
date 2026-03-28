import { createLocalItemListPersister } from "../local/LocalItemListPersisterFactory";
import { createIndexedDBSyncQueueAdapter } from "../../sync/IndexedDBSyncQueueAdapter";
import { createSyncEngine } from "../../sync/SyncEngineFactory";
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory";
import { SyncAwareItemListPersister } from "@/infra/persistance/sync-aware/SyncAwareItemListPersister";

export const createSyncAwareItemListPersister = () => new SyncAwareItemListPersister(
  createLocalItemListPersister(),
  createIndexedDBSyncQueueAdapter(),
  createSyncEngine(),
  createIdGeneratorAdapter()
)