export interface IdGeneratorOutputPort {
  generate(): Promise<string>
}