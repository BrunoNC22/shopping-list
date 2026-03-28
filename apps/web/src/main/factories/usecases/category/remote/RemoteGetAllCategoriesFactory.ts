import { createRemoteCategoryPersister } from "@/main/factories/persister/remote/RemoteCategoryPersisterFactory";
import { GetAllCategories } from "@shopping-list/domain";

export const createRemoteGetAllCategories = () => new GetAllCategories(createRemoteCategoryPersister())