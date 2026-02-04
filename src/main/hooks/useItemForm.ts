import { useCallback, useState } from "react";

export type FormItem = {
  itemName: string;
  itemValue: number;
  itemAmount: number;
  itemCategoryId: string
};

interface ItemFormProps extends Partial<FormItem> {
  onSubmit: (formItem: FormItem) => Promise<unknown> | unknown;
};

export const useItemForm = ({ 
  onSubmit,
  itemAmount: defaultItemAmount,
  itemCategoryId,
  itemName: defaultItemName,
  itemValue: defaultItemValue
}: ItemFormProps) => {
    const [itemName, setItemName] = useState<string>(defaultItemName ?? "");
    const [itemValue, setItemValue] = useState<string>(defaultItemValue ? String(defaultItemValue) : "");
    const [itemAmount, setItemAmount] = useState<string>(defaultItemAmount ? String(defaultItemAmount) : "");
    const [categoryId, setCategoryId] = useState<string>(itemCategoryId ?? "")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const updateItemAmount = useCallback((newValue: string) => {
      const transformedValue = newValue.replace(/[^0-9]/g, "")
      setItemAmount(transformedValue)
    }, [])
  
    const validate = useCallback(() => {
      if (!itemName) return false;
      if (!itemValue) return false;
      if (!itemAmount) return false;
      if (!categoryId) return false
  
      if (!Number(itemValue)) return false;
      if (!Number(itemAmount)) return false;
  
      return true;
    }, [itemName, itemValue, itemAmount, categoryId]);
  
    const resetForm = useCallback(() => {
      setItemName("");
      setItemValue("");
      setItemAmount("");
      setCategoryId("")
    }, [setItemName, setItemValue, setItemAmount]);
  
    const submitItem = useCallback(async () => {
      if (!validate()) return;
      
      setIsSubmitting(true);
      try {
        await onSubmit({
          itemAmount: Number(itemAmount),
          itemName,
          itemValue: Number(itemValue),
          itemCategoryId: categoryId
        });
        resetForm();
      } catch (e) {
        console.log(e);
      }
      setIsSubmitting(false);
    }, [validate, itemAmount, itemName, itemValue, onSubmit, resetForm, categoryId]);

    return {
      itemName,
      setItemName,
      itemValue,
      setItemValue,
      itemAmount,
      setItemAmount: updateItemAmount,
      isSubmitting,
      submitItem,
      categoryId,
      setCategoryId
    }
}