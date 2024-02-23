import React from "react";
import Card from "../../../../components/Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import BankAccountOverviewHeader from "./BankAccountOverviewHeader/BankAccountOverviewHeader";

const BankAccountOverview: React.FC = () => {
  const { bankAccount, budgetsOverview } = useBankAccountContext();
  return (
    <>
      <BankAccountOverviewHeader bankAccount={bankAccount} />
      <Card>
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </Card>
    </>
  );
};

export default BankAccountOverview;
