import { GetItems } from "@/domain/usecases/item/GetItems";
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";

export const createLocalGetItems = () => new GetItems(createLocalItemPeristerAdapter())