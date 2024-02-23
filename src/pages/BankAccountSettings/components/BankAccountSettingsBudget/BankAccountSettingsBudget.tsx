import React from "react";
import './BankAccountSettingsBudget.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";

interface BankAccountSettingsProps {
}

const BankAccountSettingsBudget: React.FC<BankAccountSettingsProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <>
      Budget settings
    </>
  );
};

export default BankAccountSettingsBudget;
