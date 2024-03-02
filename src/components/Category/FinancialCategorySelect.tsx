import React, { useCallback } from 'react'
import { apiFinancialCategoryService } from '../../services/apiFinancialCategoryService'
import { CategoryService } from '../../services/categoryService'
import { RegisterOptions } from 'react-hook-form'
import SelectFetcher from '../Form/Fields/SelectFetcher'

interface FinancialCategorySelectProps {
    name: string
    label: string
    defaultValue?: string
    validationRules?: RegisterOptions
  }
  
  const FinancialCategorySelect: React.FC<FinancialCategorySelectProps> = ({ name, label, validationRules, defaultValue }) => {
    const loadFinancialCategories = useCallback(async () => {
      const categories = await apiFinancialCategoryService.getFinancialCategories();
      return CategoryService.flattenCategories(categories);
    }, []);
  
    return (
      <SelectFetcher
        name={name}
        label={label}
        loadOptionsFunction={loadFinancialCategories}
        defaultValue={defaultValue ?? ""}
        validationRules={validationRules}
        emptyChoice={{value:"", label:"Non catégorisé"}}
      />
    )
  }
  
  export default FinancialCategorySelect
  