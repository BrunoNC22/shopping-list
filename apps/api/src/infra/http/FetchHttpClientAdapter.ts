import { HttpClientOutputPort, PostRequestProps, RequestProps } from "@shopping-list/domain"

export class FetchHttpClientAdapter implements HttpClientOutputPort {
  async post<T>(props: PostRequestProps): Promise<T> {
    const body = props.body ? props.body : undefined
    const resp = await fetch(props.url, {
      method: "POST",
      body: body as BodyInit,
      headers: props.headers
    })

    return await resp.json() as T
  }

  async get<T>(props: RequestProps): Promise<T> {
    const resp = await fetch(props.url, {
      method: "GET",
      headers: props.headers
    })

    return await resp.json() as T
  }
}