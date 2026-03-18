import { IdGeneratorOutputPort } from "@shopping-list/domain";

export class IdGeneratorAdapter implements IdGeneratorOutputPort {
  async generate(): Promise<string> {
    return (Math.random() * 10000).toFixed(0)
  }
}