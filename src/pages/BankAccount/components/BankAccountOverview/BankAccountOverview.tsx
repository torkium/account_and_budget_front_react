import React from "react";
import "./BankAccountOverview.css";
import BudgetsOverview from "../../../../components/Budget/BudgetsOverview";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";
import BankAccountsOverviewTable from "./BankAccountOverviewTable";

const BankAccountOverview: React.FC = () => {
  const { budgetsOverview, bankAccountOverview } =
    useBankAccountDetailsContext();
  return (
    <div className="overview-container">
      <BankAccountsOverviewTable bankAccountOverview={bankAccountOverview} />
      <div className="budgets">
        <BudgetsOverview budgetsOverview={budgetsOverview} />
      </div>
    </div>
  );
};

export default BankAccountOverview;
