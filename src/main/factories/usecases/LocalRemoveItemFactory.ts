import { LocalRemoveItem } from "@/domain/usecases/LocalRemoveItem";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";

export const createLocalRemoveItem = () => new LocalRemoveItem(createLocalItemPeristerAdapter())