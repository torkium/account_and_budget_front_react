import React from "react";
import Card from "../../../../components/Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";
import BankAccountsOverviewTable from "./BankAccountOverviewTable";

const BankAccountOverview: React.FC = () => {
  const { budgetsOverview, bankAccountOverview } = useBankAccountDetailsContext();
  return (
    <>
      <Card>
        <BankAccountsOverviewTable bankAccountOverview={bankAccountOverview} />
      </Card>
      <Card>
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </Card>
    </>
  );
};

export default BankAccountOverview;
