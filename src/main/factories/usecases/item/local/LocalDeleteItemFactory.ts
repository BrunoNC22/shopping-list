import { DeleteItem } from "@/domain/usecases/item/DeleteItem";
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";

export const createLocalDeleteItem = () => new DeleteItem(createLocalItemPeristerAdapter())