import { DeleteItem } from "@/domain/usecases/item/DeleteItem";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";

export const createLocalDeleteItem = () => new DeleteItem(createLocalItemPeristerAdapter())