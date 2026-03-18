import { SyncAwareCategoryPersister } from "@/infra/persistance/sync-aware/SyncAwareCategoryPersister";
import { createRemoteCategoryPersister } from "../remote/RemoteCategoryPersisterFactory";
import { createLocalCategoryPersister } from "../local/LocalCategoryPersisterFactory";
import { createIndexedDBSyncQueueAdapter } from "../../sync/IndexedDBSyncQueueAdapter";
import { createSyncEngine } from "../../sync/SyncEngineFactory";
import { createIdGeneratorAdapter } from "../../id/IdGeneratorAdapterFactory";

export const createSyncAwareCategoryPersister = () => new SyncAwareCategoryPersister(
  createRemoteCategoryPersister(),
  createLocalCategoryPersister(),
  createIndexedDBSyncQueueAdapter(),
  createSyncEngine(),
  createIdGeneratorAdapter()
)