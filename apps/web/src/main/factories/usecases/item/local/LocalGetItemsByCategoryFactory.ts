import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { GetItemsByCategory } from "@shopping-list/domain";

export const createLocalGetItemsByCategory = () => {
  return new GetItemsByCategory(createLocalItemPeristerAdapter())
}