import { useCallback, useEffect, useState, type PropsWithChildren } from "react";
import { CategoriesContext } from "./CategoriesContext";
import type { Categoria } from "@/domain/models/Categoria";
import type { GetAllCategoriesInputPort } from "@/domain/input/GetAllCategoriesInputPort";

type CategoriesProviderProps = {
  getAllCategoriesUsecase: GetAllCategoriesInputPort;
};

export const CategoriesProvider = ({
  children,
  getAllCategoriesUsecase,
}: PropsWithChildren & CategoriesProviderProps) => {
  const [categories, setCategories] = useState<Categoria[] | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const getAllCategories = useCallback(async () => {
    setIsLoading(true)
    setCategories(await getAllCategoriesUsecase.perform())
    setIsLoading(false)
  }, [getAllCategoriesUsecase]);

  useEffect(() => {
    getAllCategories()
  }, [getAllCategories])

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
