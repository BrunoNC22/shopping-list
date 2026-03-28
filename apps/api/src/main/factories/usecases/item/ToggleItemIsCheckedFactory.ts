import { ToggleItemIsChecked } from "@shopping-list/domain";
import { createItemPersisterPrismaAdapterFactory } from "../../db/ItemPersisterPrismaAdapterFactory";

export const createToggleItemIsChecked = () => new ToggleItemIsChecked(createItemPersisterPrismaAdapterFactory())