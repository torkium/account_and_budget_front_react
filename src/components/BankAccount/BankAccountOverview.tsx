import React from "react";
import Card from "../Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountContext } from "../../context/BankAccountContext";

const BankAccountOverview: React.FC = () => {
  const { bankAccount, budgetsOverview } = useBankAccountContext();
  return (
    <>
      <h2>Détails du compte bancaire {bankAccount.label}</h2>
      <Card>
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </Card>
    </>
  );
};

export default BankAccountOverview;
