export interface SyncEngineOutputPort {
  trigger(): Promise<void>
}