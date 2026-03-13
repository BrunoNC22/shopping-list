import { ToggleItemIsChecked } from "@/domain/usecases/item/ToggleItemIsChecked";
import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";

export const createLocalToggleItemIsChecked = () => new ToggleItemIsChecked(createLocalItemPeristerAdapter())