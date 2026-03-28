import { createRemoteItemPersisterFactory } from "@/main/factories/persister/remote/RemoteItemPersisterFactory";
import { GetItems } from "@shopping-list/domain";

export const createRemoteGetItems = () => new GetItems(createRemoteItemPersisterFactory())