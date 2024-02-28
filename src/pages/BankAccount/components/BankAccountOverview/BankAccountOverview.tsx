import React from "react";
import Card from "../../../../components/Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";

const BankAccountOverview: React.FC = () => {
  const { budgetsOverview } = useBankAccountDetailsContext();
  return (
    <>
      <Card>
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </Card>
    </>
  );
};

export default BankAccountOverview;
