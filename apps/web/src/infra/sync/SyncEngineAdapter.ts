import type { AnySyncEvent, GetPendingSyncQueueOutputPort, MarkAsSyncedSyncQueueOutputPort, PostHTTPClientOutputPort, SyncEngineOutputPort, SyncEventEnum } from "@shopping-list/domain"


type RemoteSyncEvent = {
  id: string,
  type: SyncEventEnum,
  payload: object,
  createdAt: string,
}

export class SyncEngine implements SyncEngineOutputPort {

  static isRunning = false

  constructor(
    private readonly queue: GetPendingSyncQueueOutputPort & MarkAsSyncedSyncQueueOutputPort,
    private readonly httpClient: PostHTTPClientOutputPort
  ) {}

  async trigger() {
    if (SyncEngine.isRunning) return
    if (!navigator.onLine) return

    SyncEngine.isRunning = true

    const pending = await this.queue.getPending()

    const requestBody = pending.map((syncEvent) => this.toRemoteSyncEnvent(syncEvent))
    try {
      await this.httpClient.post({ url: "/sync/events", body: requestBody })
      
      await Promise.all(
        pending.map((event) => this.queue.markAsSynced(event.id))
      )
    } catch (e) {
      console.log("Error while trying to sync events: ", e)
    }

    SyncEngine.isRunning = false
  }

  toRemoteSyncEnvent(syncEvent: AnySyncEvent): RemoteSyncEvent {
    return {
      id: syncEvent.id,
      createdAt: syncEvent.createdAt.toISOString(),
      type: syncEvent.type,
      payload: syncEvent.payload as object
    }
  }
}