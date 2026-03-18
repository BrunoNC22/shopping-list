import { HttpError, NotFoundError, UnauthorizedError, type HttpClientOutputPort, type PostRequestProps, type RequestProps } from "@shopping-list/domain"



export class FetchHttpClientAdapter implements HttpClientOutputPort {
  constructor(private readonly baseUrl: string) {}

  async post<T>(props: PostRequestProps): Promise<T> {
    const defaultHeaders = { "content-type": "application/json" }

    const headers = props.headers
      ? { ...defaultHeaders, ...props.headers }
      : defaultHeaders

    const resp = await fetch(`${this.baseUrl}${props.url}`, {
      method: "POST",
      body: props.body ? JSON.stringify(props.body) : undefined,
      headers,
      credentials: "include"
    })

    await this.handleHttpErrors(resp)

    return await resp.json() as T
  }


  async get<T>(props: RequestProps): Promise<T> {
    const resp = await fetch(`${this.baseUrl}${props.url}`, {
      method: "GET",
      headers: props.headers,
      credentials: "include"
    })

    await this.handleHttpErrors(resp)

    return await resp.json() as T
  }


  private async handleHttpErrors(resp: Response): Promise<void> {
    if (resp.ok) return

    switch (resp.status) {
      case 401:
        throw new UnauthorizedError()

      case 404:
        throw new NotFoundError()

      default:
        throw new HttpError(resp.status, resp.statusText)
    }
  }
}