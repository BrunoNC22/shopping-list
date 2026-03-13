import { GetTotalByCategory } from "@/domain/usecases/item/GetTotalByCategory";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";

export const createLocalGetTotalByCategory = () => new GetTotalByCategory(createLocalItemPeristerAdapter())