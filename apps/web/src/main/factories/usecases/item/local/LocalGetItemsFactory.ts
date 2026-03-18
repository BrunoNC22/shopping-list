import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { GetItems } from "@shopping-list/domain";

export const createLocalGetItems = () => new GetItems(createLocalItemPeristerAdapter())