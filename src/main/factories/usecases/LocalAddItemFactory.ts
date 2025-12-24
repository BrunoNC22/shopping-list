import LocalAddItem from "@/domain/usecases/LocalAddItem";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";
import { createLocalCategoryPersister } from "../persister/LocalCategoryPersisterFactory";
import { createLocalItemListPersister } from "../persister/LocalItemListPersisterFactory";

export const createLocalAddItem = () => new LocalAddItem(createLocalItemPeristerAdapter(), createLocalCategoryPersister(), createLocalItemListPersister())