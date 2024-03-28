import React, { useCallback } from "react";
import { ApiFinancialCategoryService } from "../../../services/apiFinancialCategoryService";
import { CategoryService } from "../../../services/categoryService";
import { RegisterOptions } from "react-hook-form";
import SelectFetcher from "../../generic/Form/Fields/SelectFetcher";

interface FinancialCategorySelectProps {
  name: string;
  label: string;
  defaultValue?: string;
  validationRules?: RegisterOptions;
  emptyLabel?: string;
}

const FinancialCategorySelect: React.FC<FinancialCategorySelectProps> = ({
  name,
  label,
  validationRules,
  defaultValue,
  emptyLabel = "Non catégorisé",
}) => {
  const apiFinancialCategoryService = new ApiFinancialCategoryService();
  const loadFinancialCategories = useCallback(async () => {
    const categories = await apiFinancialCategoryService.get();
    return CategoryService.flattenCategories(categories);
  }, []);

  return (
    <SelectFetcher
      name={name}
      label={label}
      loadOptionsFunction={loadFinancialCategories}
      defaultValue={defaultValue ?? ""}
      validationRules={validationRules}
      emptyChoice={{ value: "", label: emptyLabel }}
    />
  );
};

export default FinancialCategorySelect;
