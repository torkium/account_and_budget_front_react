import React from "react";
import './BankAccountSettingsBudget.css';
import Card from "../../../../components/generic/Card/Card";
import BudgetsList from "../../../../components/Budget/BudgetsList";

interface BankAccountSettingsProps {
}

const BankAccountSettingsBudget: React.FC<BankAccountSettingsProps> = () => {
  return (
    <Card>
      <h3>Paramétrage des budgets</h3>
      <BudgetsList />
    </Card>
  );
};

export default BankAccountSettingsBudget;
