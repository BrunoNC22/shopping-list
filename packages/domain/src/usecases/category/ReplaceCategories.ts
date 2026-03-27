import { ReplaceCategoriesInputPort, ReplaceCategoriesProps } from "@/input";
import { ReplaceCategoriesPersisterOutputPort } from "@/output";

export class ReplaceCategories implements ReplaceCategoriesInputPort {
  constructor(private readonly categoryPersister: ReplaceCategoriesPersisterOutputPort) {}

  async perform(props: ReplaceCategoriesProps): Promise<void> {
    await this.categoryPersister.replace(props.categories)
  }
}