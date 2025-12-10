import LocalAddItem from "@/domain/usecases/LocalAddItem";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";
import { createLocalCategoryPersister } from "../persister/LocalCategoryPersisterFactory";

export const createLocalAddItem = () => new LocalAddItem(createLocalItemPeristerAdapter(), createLocalCategoryPersister())