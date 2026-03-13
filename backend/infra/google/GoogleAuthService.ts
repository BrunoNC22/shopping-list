import { GoogleAuthServiceOutputPort, GoogleAuthServiceProps, GoogleAuthServiceResponse } from "../../domain/output/GoogleAuthServiceOutputPort";
import { GetHttpClientOutputPort, PostHTTPClientOutputPort } from "../../domain/output/HttpClient";

type GetTokenResponseType = {
  access_token: string,
  expires_in: number,
  scope: string,
  token_type: string,
  id_token: string
}

type GetUserDataResponseType = {
  id: string,
  email: string,
  verified_email: boolean,
  name: string,
  given_name: string,
  family_name: string,
  picture: string
}

export class GoogleAuthService implements GoogleAuthServiceOutputPort {
  constructor(private readonly httpClient: PostHTTPClientOutputPort & GetHttpClientOutputPort) {}

  async getUserData({ code }: GoogleAuthServiceProps): Promise<GoogleAuthServiceResponse> {
    const resp = await this.httpClient.post<GetTokenResponseType>({ 
      url: "https://oauth2.googleapis.com/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.VITE_GOOGLE_PUBLIC_API_KEY as string,
        client_secret: process.env.GOOGLE_PRIVATE_API_KEY as string,
        redirect_uri: "http://localhost:8000/auth/google/redirect",
        grant_type: "authorization_code",
      }),
    })

    const finalResponse = await this.httpClient.get<GetUserDataResponseType>({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      headers: { Authorization: `${resp.token_type} ${resp.access_token}` }
    })

    return {
      email: finalResponse.email,
      id: finalResponse.id,
      isEmailVerified: finalResponse.verified_email,
      name: finalResponse.name,
      pictureUrl: finalResponse.picture
    }
  }
}