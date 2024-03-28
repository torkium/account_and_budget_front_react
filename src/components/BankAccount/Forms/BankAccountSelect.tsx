import React, { useCallback, useEffect, useState } from "react";
import { ApiBankAccountService } from "../../../services/apiBankAccountService";
import { RegisterOptions } from "react-hook-form";
import SelectFetcher from "../../generic/Form/Fields/SelectFetcher";
import { useApp } from "../../../context/AppContext";
import { BankAccountInterface } from "../../../interfaces/Bank";

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
  const { profileSelection } = useApp();
  const [reload, setReload] = useState<boolean>(false);
  const loadBankAccounts = useCallback(async () => {
    const bankAccounts = await new ApiBankAccountService().get();
    setReload(false);
    return bankAccounts.map((bankAccount) => ({
      value: bankAccount.id.toString(),
      label: bankAccount.label,
    }));
  }, []);
  
  useEffect(() => {
    if (profileSelection !== undefined) {
      setReload(true);
    }
  }, [profileSelection]);

  return (
    <SelectFetcher
      name={name}
      label={label}
      loadOptionsFunction={loadBankAccounts}
      defaultValue={defaultValue}
      validationRules={validationRules}
      emptyChoice={{ value: "", label: emptyLabel }}
      reload={reload}
    />
  );
};

export default BankAccountSelect;
