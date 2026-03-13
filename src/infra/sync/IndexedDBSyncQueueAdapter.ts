import SyncEvent, { type AnySyncEvent, SyncEventEnum } from "@/domain/models/SyncEvent";
import type { SyncQueueOutputPort } from "@/domain/output/sync/SyncQueueOutputPort";
import type { AnyStorageSyncEvent } from "./types/StorageSyncEvent";

export class IndexedDBSyncQueueAdapter implements SyncQueueOutputPort {
  private readonly DB_NAME = "shopping-sync"
  private readonly STORE = "syncQueue"

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, 1)
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.STORE)) {
          db.createObjectStore(this.STORE, { keyPath: "id" })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async add(event: AnySyncEvent): Promise<void> {
    const db = await this.getDB()
    const tx = db.transaction(this.STORE, "readwrite")
    const store = tx.objectStore(this.STORE)
    const storageEvent = this.toStorage(event)
    store.put(storageEvent)
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(undefined)
      tx.onerror = () => reject(tx.error)
    })
  }

  async getPending(): Promise<AnySyncEvent[]> {
    const db = await this.getDB()

    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.STORE, "readonly")
      const store = tx.objectStore(this.STORE)
      const request = store.getAll()
      request.onsuccess = () => {
        const events = request.result
          .filter((e: AnyStorageSyncEvent) => !e.synced)
          .map(this.toDomain)
        resolve(events)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async markAsSynced(eventId: string): Promise<void> {
    const db = await this.getDB()
    const tx = db.transaction(this.STORE, "readwrite")
    const store = tx.objectStore(this.STORE)
    const request = store.get(eventId)
    request.onsuccess = () => {
      const event = request.result as AnyStorageSyncEvent
      if (!event) return
      event.synced = true
      store.put(event)
    }
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(undefined)
      tx.onerror = () => reject(tx.error)
    })
  }

  private toDomain(event: AnyStorageSyncEvent): AnySyncEvent {
    switch (event.type) {
      case SyncEventEnum.CREATE_CATEGORY:
        return new SyncEvent(
          event.id,
          SyncEventEnum.CREATE_CATEGORY,
          {
            id: event.payload.id,
            name: event.payload.name
          },
          new Date(event.createdAt),
          event.synced
        )

      case SyncEventEnum.EDIT_CATEGORY:
        return new SyncEvent(
          event.id,
          SyncEventEnum.EDIT_CATEGORY,
          {
            id: event.payload.id,
            name: event.payload.name
          },
          new Date(event.createdAt),
          event.synced
        )

      case SyncEventEnum.DELETE_CATEGORY:
        return new SyncEvent(
          event.id,
          SyncEventEnum.DELETE_CATEGORY,
          {
            id: event.payload.id
          },
          new Date(event.createdAt),
          event.synced
        )

      case SyncEventEnum.CREATE_ITEM:
        return new SyncEvent(
          event.id,
          SyncEventEnum.CREATE_ITEM,
          {
            id: event.payload.id,
            itemListId: event.payload.itemListId,
            name: event.payload.name,
            price: event.payload.price,
            amount: event.payload.amount,
            categoryId: event.payload.categoryId,
            checked: event.payload.checked
          },
          new Date(event.createdAt),
          event.synced
        )
      
      case SyncEventEnum.EDIT_ITEM:
        return new SyncEvent(
          event.id,
          SyncEventEnum.EDIT_ITEM,
          {
            id: event.payload.id,
            name: event.payload.name,
            price: event.payload.price,
            amount: event.payload.amount,
            categoryId: event.payload.categoryId,
            checked: event.payload.checked
          },
          new Date(event.createdAt),
          event.synced
        )
      
      case SyncEventEnum.DELETE_ITEM:
        return new SyncEvent(
          event.id,
          SyncEventEnum.DELETE_ITEM,
          {
            id: event.payload.id
          },
          new Date(event.createdAt),
          event.synced
        )
      
      case SyncEventEnum.CREATE_ITEM_LIST:
        return new SyncEvent(
          event.id,
          SyncEventEnum.CREATE_ITEM_LIST,
          {
            id: event.payload.id,
            name: event.payload.name,
            createdAt: new Date(event.payload.createdAt)
          },
          new Date(event.createdAt),
          event.synced
        )
      
      case SyncEventEnum.EDIT_ITEM_LIST:
        return new SyncEvent(
          event.id,
          SyncEventEnum.EDIT_ITEM_LIST,
          {
            id: event.payload.id,
            name: event.payload.name
          },
          new Date(event.createdAt),
          event.synced
        )
      
      case SyncEventEnum.DELETE_ITEM_LIST:
        return new SyncEvent(
          event.id,
          SyncEventEnum.DELETE_ITEM_LIST,
          {
            id: event.payload.id
          },
          new Date(event.createdAt),
          event.synced
        )
    }
  }

  private toStorage(event: AnySyncEvent): AnyStorageSyncEvent {
    switch (event.type) {
      case SyncEventEnum.CREATE_CATEGORY:
        return {
          id: event.id,
          type: SyncEventEnum.CREATE_CATEGORY,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            name: event.payload.name
          }
        }
      
      case SyncEventEnum.EDIT_CATEGORY:
        return {
          id: event.id,
          type: SyncEventEnum.EDIT_CATEGORY,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            name: event.payload.name
          }
        }
      
      case SyncEventEnum.DELETE_CATEGORY:
        return {
          id: event.id,
          type: SyncEventEnum.DELETE_CATEGORY,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id
          }
        }
      
      case SyncEventEnum.CREATE_ITEM:
        return {
          id: event.id,
          type: SyncEventEnum.CREATE_ITEM,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            itemListId: event.payload.itemListId,
            name: event.payload.name,
            price: event.payload.price,
            amount: event.payload.amount,
            categoryId: event.payload.categoryId,
            checked: event.payload.checked
          }
        }
      
      case SyncEventEnum.EDIT_ITEM:
        return {
          id: event.id,
          type: SyncEventEnum.EDIT_ITEM,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            name: event.payload.name,
            price: event.payload.price,
            amount: event.payload.amount,
            categoryId: event.payload.categoryId,
            checked: event.payload.checked
          }
        }
      
      case SyncEventEnum.DELETE_ITEM:
        return {
          id: event.id,
          type: SyncEventEnum.DELETE_ITEM,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id
          }
        }
      
      case SyncEventEnum.CREATE_ITEM_LIST:
        return {
          id: event.id,
          type: SyncEventEnum.CREATE_ITEM_LIST,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            name: event.payload.name,
            createdAt: event.payload.createdAt.toISOString()
          }
        }
      
      case SyncEventEnum.EDIT_ITEM_LIST:
        return {
          id: event.id,
          type: SyncEventEnum.EDIT_ITEM_LIST,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id,
            name: event.payload.name
          }
        }
      
      case SyncEventEnum.DELETE_ITEM_LIST:
        return {
          id: event.id,
          type: SyncEventEnum.DELETE_ITEM_LIST,
          createdAt: event.createdAt.toISOString(),
          synced: event.synced,
          payload: {
            id: event.payload.id
          }
        }
    }
  }
}