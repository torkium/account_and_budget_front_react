import React from "react";
import "./BankAccountOverview.css";
import BudgetsOverviewTable from "../Budgets/BudgetsOverview";
import { useBankAccountDetailsContext } from "../../../../context/BankAccountDetailsContext";
import BankAccountsOverviewTable from "./BankAccountOverviewTable";

const BankAccountOverview: React.FC = () => {
  const { budgetsOverview, bankAccountOverview } =
    useBankAccountDetailsContext();
  return (
    <div className="overview-container">
      <BankAccountsOverviewTable bankAccountOverview={bankAccountOverview} />
      <div className="budgets">
        <BudgetsOverviewTable budgetsOverview={budgetsOverview} />
      </div>
    </div>
  );
};

export default BankAccountOverview;
