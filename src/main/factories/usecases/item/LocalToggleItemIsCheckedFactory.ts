import { ToggleItemIsChecked } from "@/domain/usecases/item/ToggleItemIsChecked";
import { createLocalItemPeristerAdapter } from "../../persister/LocalItemPersisterAdapterFactory";

export const createLocalToggleItemIsChecked = () => new ToggleItemIsChecked(createLocalItemPeristerAdapter())