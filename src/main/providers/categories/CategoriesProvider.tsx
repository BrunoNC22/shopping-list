import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CategoriesContext } from "./CategoriesContext";
import type { Categoria } from "@/domain/models/Categoria";
import type { GetAllCategoriesInputPort } from "@/domain/input/GetAllCategoriesInputPort";
import type { CreateCategoryInputPort, CreateCategoryProps } from "@/domain/input/CreateCategoryInputPort";

type CategoriesProviderProps = {
  getAllCategoriesUsecase: GetAllCategoriesInputPort;
  localGetAllCategories: GetAllCategoriesInputPort
  createCategoryUsecase: CreateCategoryInputPort
};

export const CategoriesProvider = ({
  children,
  getAllCategoriesUsecase,
  localGetAllCategories,
  createCategoryUsecase
}: PropsWithChildren & CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Categoria[] | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const getAllCategories = useCallback(async () => {
    setIsLoading(true)
    setCategories(await localGetAllCategories.perform())
    setIsLoading(false)

    getAllCategoriesUsecase.perform()
      .then(result => {
        setCategories(result)
      })
  }, [localGetAllCategories, getAllCategoriesUsecase]);

  const handleCreateCategory = useCallback(async (props: CreateCategoryProps) => {
    const createdCategoryId = await createCategoryUsecase.perform(props)
    getAllCategories()
    return createdCategoryId
  }, [createCategoryUsecase, getAllCategories])

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  useEffect(() => {
    const interval = setInterval(() => {
      getAllCategoriesUsecase.perform()
        .then(result => {
          setCategories(result)
        })
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
