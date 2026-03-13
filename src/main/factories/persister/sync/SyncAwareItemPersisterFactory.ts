import { SyncAwareItemPersister } from "@/infra/persistance/sync-aware/SyncAwareItemPersister";
import { createRemoteItemPersisterFactory } from "../remote/RemoteItemPersisterFactory";
import { createLocalItemPeristerAdapter } from "../local/LocalItemPersisterAdapterFactory";
import { createIndexedDBSyncQueueAdapter } from "../../sync/IndexedDBSyncQueueAdapter";
import { createSyncEngine } from "../../sync/SyncEngineFactory";
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory";

export const createSyncAwareItemPersister = () => new SyncAwareItemPersister(
  createRemoteItemPersisterFactory(),
  createLocalItemPeristerAdapter(),
  createIndexedDBSyncQueueAdapter(),
  createSyncEngine(),
  createIdGeneratorAdapter()
)