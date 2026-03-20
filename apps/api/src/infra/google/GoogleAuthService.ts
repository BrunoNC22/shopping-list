import { GetHttpClientOutputPort, GoogleAuthServiceOutputPort, GoogleAuthServiceProps, GoogleAuthServiceResponse, PostHTTPClientOutputPort } from "@shopping-list/domain"

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

export type GoogleAuthServiceConfig = {
  clientId: string,
  clientSecret: string,
  redirectUri: string,
  getTokenUrl: string,
  getUserInfoUrl: string
}

export class GoogleAuthService implements GoogleAuthServiceOutputPort {
  constructor(
    private readonly httpClient: PostHTTPClientOutputPort & GetHttpClientOutputPort,
    private readonly config: GoogleAuthServiceConfig
  ) {}

  async getUserData({ code }: GoogleAuthServiceProps): Promise<GoogleAuthServiceResponse> {
    const body: BodyInit = new URLSearchParams()
    body.append("code", code)
    body.append("client_id", this.config.clientId)
    body.append("client_secret", this.config.clientSecret)
    body.append("redirect_uri", this.config.redirectUri)
    body.append("grant_type", "authorization_code")

    const resp = await this.httpClient.post<GetTokenResponseType>({ 
      url: this.config.getTokenUrl,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body,
    })

    const finalResponse = await this.httpClient.get<GetUserDataResponseType>({
      url: this.config.getUserInfoUrl,
      headers: { Authorization: `${resp.token_type} ${resp.access_token}` }
    })

    console.log("user info from google: ", finalResponse)
    return {
      email: finalResponse.email,
      id: finalResponse.id,
      isEmailVerified: finalResponse.verified_email,
      name: finalResponse.name,
      pictureUrl: finalResponse.picture
    }
  }
}