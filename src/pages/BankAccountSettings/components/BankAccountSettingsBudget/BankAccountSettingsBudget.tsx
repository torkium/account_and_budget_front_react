import React from "react";
import './BankAccountSettingsBudget.css';
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import Card from "../../../../components/Card/Card";

interface BankAccountSettingsProps {
}

const BankAccountSettingsBudget: React.FC<BankAccountSettingsProps> = () => {
  const {bankAccount} = useBankAccountContext();
  return (
    <Card>
      <h3>Paramétrage des budgets</h3>
    </Card>
  );
};

export default BankAccountSettingsBudget;
