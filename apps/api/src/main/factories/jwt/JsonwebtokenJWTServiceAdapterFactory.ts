import { JsonwebtokenJWTServiceAdapter } from "../../../infra/jwt/JsonwebtokenJWTServiceAdapter";
import { env } from "../../config/env";

export const createJsonwebtokenJWTServiceAdapter = <T = unknown>() => new JsonwebtokenJWTServiceAdapter<T>(env.JWT_SECRET)