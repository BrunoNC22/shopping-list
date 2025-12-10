import { LocalToggleIsChecked } from "@/domain/usecases/LocalToggleIsChecked";
import { createLocalItemPeristerAdapter } from "../persister/LocalItemPersisterAdapterFactory";

export const createLocalToggleIsChecked = () => new LocalToggleIsChecked(createLocalItemPeristerAdapter())