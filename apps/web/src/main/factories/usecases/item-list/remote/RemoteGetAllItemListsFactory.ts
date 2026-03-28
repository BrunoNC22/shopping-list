import { createRemoteItemListPersister } from "@/main/factories/persister/remote/RemoteItemListPersisterFactory";
import { GetItemLists } from "@shopping-list/domain";

export const createRemoteGetAllItemLists = () => new GetItemLists(createRemoteItemListPersister())