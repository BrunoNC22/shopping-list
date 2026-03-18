import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { GetTotalByCategory } from "@shopping-list/domain";

export const createLocalGetTotalByCategory = () => new GetTotalByCategory(createLocalItemPeristerAdapter())