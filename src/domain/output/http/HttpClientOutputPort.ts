export type RequestBodyType = FormData | URLSearchParams | object | undefined

export interface RequestProps {
  url: string,
  headers?: Record<string, string>
}

export interface PostRequestProps extends RequestProps {
  body?: RequestBodyType
}

export interface PostHTTPClientOutputPort {
  post<T>(props: PostRequestProps): Promise<T>
}

export interface GetHttpClientOutputPort {
  get<T>(props: RequestProps): Promise<T>
}

export interface HttpClientOutputPort extends GetHttpClientOutputPort, PostHTTPClientOutputPort {}