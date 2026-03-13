import { RemoteItemPersister } from "@/infra/persistance/remote/RemoteItemPersister";
import { createFetchHttpClientAdapter } from "../../http/FetchHttpClientAdapterFactory";

export const createRemoteItemPersisterFactory = () => new RemoteItemPersister(createFetchHttpClientAdapter())