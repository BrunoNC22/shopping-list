import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { ReplaceItems } from "@shopping-list/domain";

export const createLocalReplaceItems = () => new ReplaceItems(createLocalItemPeristerAdapter())