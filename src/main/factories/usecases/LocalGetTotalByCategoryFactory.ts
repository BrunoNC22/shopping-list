import { GetTotalByCategory } from "@/domain/usecases/GetTotalByCategory";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";

export const createLocalGetTotalByCategory = () => new GetTotalByCategory(createLocalItemPeristerAdapter())