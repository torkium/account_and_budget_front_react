import React, { useCallback } from 'react'
import { apiBankService } from '../../services/apiBankService'
import { RegisterOptions } from 'react-hook-form'
import SelectFetcher from '../generic/Form/Fields/SelectFetcher'

interface BankSelectProps {
    name: string
    label: string
    defaultValue?: string
    validationRules?: RegisterOptions
  }
  
  const BankSelect: React.FC<BankSelectProps> = ({ name, label, validationRules, defaultValue }) => {
    const loadBanks = useCallback(async () => {
      const banks = await apiBankService.getBanks();
      return banks.map(bank => ({ value: bank.id.toString(), label: bank.label }));
    }, []);
  
    return (
      <SelectFetcher
        name={name}
        label={label}
        loadOptionsFunction={loadBanks}
        defaultValue={defaultValue}
        validationRules={validationRules}
      />
    )
  }
  
  export default BankSelect
  