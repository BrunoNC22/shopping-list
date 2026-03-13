import { GoogleAuthService } from "../../../infra/google/GoogleAuthService";
import { createFetchHttpClient } from "../http/FetchHttpClientFactory";

export const createGoogleAuthService = () => new GoogleAuthService(createFetchHttpClient())