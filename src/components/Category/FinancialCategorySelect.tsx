import React, { useEffect, useState } from 'react'
import SelectField from '../Form/Fields/Select'
import { apiFinancialCategoryService } from '../../services/apiFinancialCategoryService'
import { CategoryService } from '../../services/categoryService'
import { RegisterOptions, useFormContext } from 'react-hook-form'

interface FinancialCategorySelectProps {
    name: string
    label: string
    defaultValue?: string
    validationRules?: RegisterOptions
  }
  
  const FinancialCategorySelect: React.FC<FinancialCategorySelectProps> = ({ name, label, validationRules, defaultValue }) => {
    const [options, setOptions] = useState<{ value: string; label: string; }[]>([])
    const { setValue } = useFormContext();
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categories = await apiFinancialCategoryService.getFinancialCategories();
          const flattenedOptions = CategoryService.flattenCategories(categories);
          setOptions(flattenedOptions);

          if (defaultValue) {
            setValue(name, defaultValue);
          }
        } catch (error) {
        }
      };
  
      fetchCategories();
    }, [name, setValue, defaultValue]);
  
    return (
      <SelectField
        name={name}
        label={label}
        options={options}
        validationRules={validationRules}
      />
    )
  }
  
  export default FinancialCategorySelect
  