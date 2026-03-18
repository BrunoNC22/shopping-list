import { createLocalCurrentAccountPersister } from "../../persister/local/LocalCurrentAccountPersisterFactory";
import { createFetchHttpClientAdapter } from "../../http/FetchHttpClientAdapterFactory";
import { InitiateGoogleAuthentication, type InitiateGoogleAuthenticationPresenterOutputPort } from "@shopping-list/domain";

export const createLocalGoogleLogin = (presenter: InitiateGoogleAuthenticationPresenterOutputPort) => new InitiateGoogleAuthentication(createLocalCurrentAccountPersister(), createFetchHttpClientAdapter(), presenter)