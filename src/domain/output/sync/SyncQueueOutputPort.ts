import type { AnySyncEvent } from "@/domain/models/SyncEvent"

export interface AddEventSyncQueueOutputPort {
  add(event: AnySyncEvent): Promise<void>
}

export interface GetPendingSyncQueueOutputPort {
  getPending(): Promise<AnySyncEvent[]>
}

export interface MarkAsSyncedSyncQueueOutputPort {
  markAsSynced(eventId: string): Promise<void>
}

export interface SyncQueueOutputPort extends AddEventSyncQueueOutputPort, GetPendingSyncQueueOutputPort, MarkAsSyncedSyncQueueOutputPort { }