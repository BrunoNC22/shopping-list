import { FetchHttpClientAdapter } from "@/infra/http/FetchHttpClientAdapter"

export const createFetchHttpClientAdapter = () => new FetchHttpClientAdapter(import.meta.env.VITE_BACKEND_URL)