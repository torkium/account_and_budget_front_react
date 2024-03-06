import React, { useState } from "react";
import SelectField from "./Select";
import { RegisterOptions } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface FinancialCategoryTypeProps {
  name: string;
  label: string;
  validationRules?: RegisterOptions;
  defaultValue?: string
}

const SelectFinancialCategoryType: React.FC<FinancialCategoryTypeProps> = ({
  name,
  label,
  validationRules,
  defaultValue
}) => {
  const [options, setOptions] = useState<Option[]>([
    {value:"", label:"Non déterminé"},
    {value:"EssentialFixedExpense", label:"Dépense essentielle fixe"},
    {value:"EssentialVariableExpense", label:"Dépenses Essentielles Variables"},
    {value:"NonEssentialFlexibleExpense", label:"Dépenses Non Essentielles Modulables"},
    {value:"Savings", label:"Épargne"},
    {value:"Investment", label:"Investissement"},
    {value:"Internal", label:"Transactions internes"},
    {value:"Income", label:"Revenus "},
    {value:"DebtRepayment", label:"Remboursements/Dettes"},
    {value:"DonationCharity", label:"Donations/Charité"},
  ]);

  return (
    <SelectField
      name={name}
      label={label}
      options={options}
      defaultValue={defaultValue}
      validationRules={validationRules}
    />
  );
};

export default SelectFinancialCategoryType;