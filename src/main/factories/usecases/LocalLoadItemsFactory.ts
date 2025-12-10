import { LocalLoadItems } from "@/domain/usecases/LocalLoadItems";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";

export const createLocalLoadItems = () => new LocalLoadItems(createLocalItemPeristerAdapter())