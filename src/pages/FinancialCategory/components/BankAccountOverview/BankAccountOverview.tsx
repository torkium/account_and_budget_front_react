import React from "react";
import "./BankAccountOverview.css";
import Card from "../../../../components/Card/Card";
import BudgetsOverviewTable from "../Budgets/BudgetsOverviewTable";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";
import BankAccountsOverviewTable from "./BankAccountOverviewTable";

const BankAccountOverview: React.FC = () => {
  const { budgetsOverview, bankAccountOverview } = useBankAccountDetailsContext();
  return (
    <div className="overview-container">
      <Card className="bank-accounts-card">
        <BankAccountsOverviewTable bankAccountOverview={bankAccountOverview} />
      </Card>
      <Card className="budgets-card">
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </Card>
    </div>
  );
};

export default BankAccountOverview;
