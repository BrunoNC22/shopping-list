import { FetchHttpClientAdapter } from "../../../infra/http/FetchHttpClientAdapter";

export const createFetchHttpClient = () => new FetchHttpClientAdapter()