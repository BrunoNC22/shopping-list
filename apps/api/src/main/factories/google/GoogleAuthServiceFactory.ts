import { GoogleAuthService } from "../../../infra/google/GoogleAuthService";
import { env } from "../../config/env";
import { createFetchHttpClient } from "../http/FetchHttpClientFactory";

export const createGoogleAuthService = () => new GoogleAuthService(
  createFetchHttpClient(),
  {
    clientId: env.GOOGLE_PUBLIC_API_KEY,
    clientSecret: env.GOOGLE_PRIVATE_API_KEY,
    getTokenUrl: "https://oauth2.googleapis.com/token",
    redirectUri: `${env.FRONTEND_URL}/auth/google/redirect`,
    getUserInfoUrl: "https://www.googleapis.com/oauth2/v2/userinfo"
  }
)