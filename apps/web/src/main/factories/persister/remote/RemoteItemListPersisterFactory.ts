import { RemoteItemListPersister } from "@/infra/persistance/remote/RemoteItemListPersister";
import { createFetchHttpClientAdapter } from "../../http/FetchHttpClientAdapterFactory";

export const createRemoteItemListPersister = () => new RemoteItemListPersister(createFetchHttpClientAdapter()) 