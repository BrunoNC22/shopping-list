import { GoogleLogin, type GoogleLoginPresenter } from "@/domain/usecases/auth/GoogleLogin";
import { createLocalCurrentAccountPersister } from "../../persister/LocalCurrentAccountPersisterFactory";
import { createFetchHttpClientAdapter } from "../../http/FetchHttpClientAdapterFactory";

export const createLocalGoogleLogin = (presenter: GoogleLoginPresenter) => new GoogleLogin(createLocalCurrentAccountPersister(), createFetchHttpClientAdapter(), presenter)