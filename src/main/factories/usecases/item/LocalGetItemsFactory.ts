import { GetItems } from "@/domain/usecases/item/GetItems";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";

export const createLocalGetItems = () => new GetItems(createLocalItemPeristerAdapter())