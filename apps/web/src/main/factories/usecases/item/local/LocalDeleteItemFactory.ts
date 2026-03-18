import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { DeleteItem } from "@shopping-list/domain";

export const createLocalDeleteItem = () => new DeleteItem(createLocalItemPeristerAdapter())