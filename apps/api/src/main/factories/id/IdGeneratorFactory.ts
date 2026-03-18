import { IdGeneratorAdapter } from "../../../infra/id/IdGeneratorAdapter";

export const createIdGenerator = () => new IdGeneratorAdapter()