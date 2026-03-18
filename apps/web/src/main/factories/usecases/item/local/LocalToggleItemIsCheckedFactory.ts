import { createLocalItemPeristerAdapter } from "@/main/factories/persister/local/LocalItemPersisterAdapterFactory";
import { ToggleItemIsChecked } from "@shopping-list/domain";

export const createLocalToggleItemIsChecked = () => new ToggleItemIsChecked(createLocalItemPeristerAdapter())