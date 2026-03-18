import type { IdGeneratorOutputPort } from "@shopping-list/domain";

export class IdGeneratorAdapter implements IdGeneratorOutputPort {
  async generate(): Promise<string> {
    return (Math.random() * 1_000_000_000).toFixed(0)
  }
}