import React, { useCallback } from "react";
import { ApiBankAccountService } from "../../../services/apiBankAccountService";
import { RegisterOptions } from "react-hook-form";
import SelectFetcher from "../../Form/Fields/SelectFetcher";

interface BankAccountSelectProps {
  name: string;
  label: string;
  defaultValue?: string;
  validationRules?: RegisterOptions;
  emptyLabel?: string;
}

const BankAccountSelect: React.FC<BankAccountSelectProps> = ({
  name,
  label,
  validationRules,
  defaultValue,
  emptyLabel = "Tous les comptes",
}) => {
  const loadBankAccounts = useCallback(async () => {
    const bankAccounts = await new ApiBankAccountService().get();
    return bankAccounts.map((bankAccount) => ({
      value: bankAccount.id.toString(),
      label: bankAccount.label,
    }));
  }, []);

  return (
    <SelectFetcher
      name={name}
      label={label}
      loadOptionsFunction={loadBankAccounts}
      defaultValue={defaultValue}
      validationRules={validationRules}
      emptyChoice={{ value: "", label: emptyLabel }}
    />
  );
};

export default BankAccountSelect;
