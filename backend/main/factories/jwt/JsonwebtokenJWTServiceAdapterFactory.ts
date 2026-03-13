import { JsonwebtokenJWTServiceAdapter } from "../../../infra/jwt/JsonwebtokenJWTServiceAdapter";

export const createJsonwebtokenJWTServiceAdapter = <T = unknown>() => new JsonwebtokenJWTServiceAdapter<T>(process.env.JWT_SECRET as string)