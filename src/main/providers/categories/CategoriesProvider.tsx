import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CategoriesContext } from "./CategoriesContext";
import type { Categoria } from "@/domain/models/Categoria";
import type { GetAllCategoriesInputPort } from "@/domain/input/GetAllCategoriesInputPort";
import type { CreateCategoryInputPort, CreateCategoryProps } from "@/domain/input/CreateCategoryInputPort";

type CategoriesProviderProps = {
  getAllCategoriesUsecase: GetAllCategoriesInputPort;
  createCategoryUsecase: CreateCategoryInputPort
};

export const CategoriesProvider = ({
  children,
  getAllCategoriesUsecase,
  createCategoryUsecase
}: PropsWithChildren & CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Categoria[] | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const getAllCategories = useCallback(async () => {
    setIsLoading(true)
    setCategories(await getAllCategoriesUsecase.perform())
    setIsLoading(false)
  }, [getAllCategoriesUsecase]);

  const handleCreateCategory = useCallback(async (props: CreateCategoryProps) => {
    const createdCategoryId = await createCategoryUsecase.perform(props)
    getAllCategories()
    return createdCategoryId
  }, [createCategoryUsecase, getAllCategories])

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

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
