import React, { useEffect, useState } from 'react'
import SelectField from '../Form/Fields/Select'
import { apiBankService } from '../../services/apiBankService'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { BankInterface } from '../../interfaces/Bank'

interface BankSelectProps {
    name: string
    label: string
    defaultValue?: string
    validationRules?: RegisterOptions
  }
  
  const BankSelect: React.FC<BankSelectProps> = ({ name, label, validationRules, defaultValue }) => {
    const [options, setOptions] = useState<{ value: string; label: string; }[]>([])
    const { setValue } = useFormContext();
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const banks = await apiBankService.getBanks();
          let options: { value: string; label: string; }[] = [];
          banks.map((bank:BankInterface) => {
            options.push({value: bank.id.toString(), label: bank.label})
          })
          setOptions(options);

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
  
  export default BankSelect
  