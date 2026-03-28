import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CategoriesContext } from "./CategoriesContext";
import type { Categoria, CreateCategoryInputPort, CreateCategoryProps, GetAllCategoriesInputPort, ReplaceCategoriesInputPort } from "@shopping-list/domain";

type CategoriesProviderProps = {
  remoteGetAllCategoriesUsecase: GetAllCategoriesInputPort;
  localGetAllCategories: GetAllCategoriesInputPort
  createCategoryUsecase: CreateCategoryInputPort
  replaceCategoriesUsecase: ReplaceCategoriesInputPort
};

export const CategoriesProvider = ({
  children,
  remoteGetAllCategoriesUsecase,
  localGetAllCategories,
  createCategoryUsecase,
  replaceCategoriesUsecase
}: PropsWithChildren & CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Categoria[] | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const getAllCategories = useCallback(async () => {
    setIsLoading(true)
    setCategories(await localGetAllCategories.perform())
    setIsLoading(false)
  }, [localGetAllCategories, remoteGetAllCategoriesUsecase]);

  const handleCreateCategory = useCallback(async (props: CreateCategoryProps) => {
    const createdCategoryId = await createCategoryUsecase.perform(props)
    getAllCategories()
    return createdCategoryId
  }, [createCategoryUsecase, getAllCategories])

  const syncCategories = useCallback(async () => {
    const remoteCategories = await remoteGetAllCategoriesUsecase.perform()
    await replaceCategoriesUsecase.perform({ categories: remoteCategories })
  }, [remoteGetAllCategoriesUsecase, replaceCategoriesUsecase])

  useEffect(() => {
    syncCategories().then(() => {
      getAllCategories()
    })
    getAllCategories()
  }, [getAllCategories])

  useEffect(() => {
    const interval = setInterval(async () => {
      await syncCategories()
      getAllCategories()
    }, 5000);

    return () => clearInterval(interval)
  }, [])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        createCategory: handleCreateCategory
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
