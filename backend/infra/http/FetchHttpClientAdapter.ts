import { HttpClientOutputPort, PostRequestProps, RequestProps } from "../../domain/output/HttpClient";

export class FetchHttpClientAdapter implements HttpClientOutputPort {
  async post<T>(props: PostRequestProps): Promise<T> {
    const resp = await fetch(props.url, {
      method: "POST",
      body: props.body,
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