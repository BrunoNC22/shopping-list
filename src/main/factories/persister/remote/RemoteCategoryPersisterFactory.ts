import { RemoteCategoryPersister } from "@/infra/persistance/remote/RemoteCategoryPersister";
import { createFetchHttpClientAdapter } from "../../http/FetchHttpClientAdapterFactory";

export const createRemoteCategoryPersister = () => new RemoteCategoryPersister(createFetchHttpClientAdapter())