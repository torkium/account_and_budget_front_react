import React from "react";
import Card from "../../../../components/Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";
import { useBankAccountContext } from "../../../../context/BankAccountContext";
import BankAccountOverviewHeader from "./BankAccountOverviewHeader/BankAccountOverviewHeader";

const BankAccountOverview: React.FC = () => {
  const { bankAccount } = useBankAccountContext();
  const { budgetsOverview } = useBankAccountDetailsContext();
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
