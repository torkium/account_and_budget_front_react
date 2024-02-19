import React, { useEffect, useState } from 'react'
import SelectField from '../Form/Fields/Select'
import { apiFinancialCategoryService } from '../../services/apiFinancialCategoryService'
import { CategoryService } from '../../services/categoryService'
import { RegisterOptions } from 'react-hook-form'

interface FinancialCategorySelectProps {
    name: string
    label: string
    validationRules?: RegisterOptions
  }
  
  const FinancialCategorySelect: React.FC<FinancialCategorySelectProps> = ({ name, label, validationRules }) => {
    const [options, setOptions] = useState<{ value: string; label: string; }[]>([])
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const categories = await apiFinancialCategoryService.getFinancialCategories()
          const flattenedOptions = CategoryService.flattenCategories(categories)
          setOptions(flattenedOptions);
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories financières", error)
        }
      };
  
      fetchCategories()
    }, [])
  
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
  