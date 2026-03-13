import { GetTotalByCategory } from "@/domain/usecases/item/GetTotalByCategory";
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";

export const createLocalGetTotalByCategory = () => new GetTotalByCategory(createLocalItemPeristerAdapter())