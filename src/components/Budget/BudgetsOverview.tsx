import React from "react";
import ProgressBar from "../generic/ProgressBar/ProgressBar";
import { BudgetOverviewInterface } from "../../interfaces/Budget";

interface BudgetsTableProps {
  budgetsOverview: BudgetOverviewInterface[];
}

const BudgetsOverview: React.FC<BudgetsTableProps> = ({
  budgetsOverview,
}) => {
  return (
    <div>
      {budgetsOverview.map((budgetOverview, index) => (
        <div key={index} className="budgetItem">
          <ProgressBar
            label={`${budgetOverview.budget.label}`}
            value={-1*budgetOverview.consumed}
            theoreticalValue={-1*budgetOverview.provisionalConsumed}
            maxValue={budgetOverview.budget.amount}
            devise="€"
          />
        </div>
      ))}
    </div>
  );
};

export default BudgetsOverview;
