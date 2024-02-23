import React from "react";
import Table from "../Table/Table";
import { BudgetOverviewInterface } from "../../interfaces/Budget";

interface BudgetsTableProps {
  budgetsOverview: BudgetOverviewInterface[];
}

const BudgetsOverviewTable: React.FC<BudgetsTableProps> = ({ budgetsOverview }) => {
  const headers = ["Label", "Montant", "Consommé", "Reste"];
  const budgetData = budgetsOverview.map((budgetOverview) => ({
    Label: budgetOverview.budget.label,
    "Montant": `${budgetOverview.budget.amount} €`,
    "Consommé": <>{budgetOverview.consumed} € <span className="lowLight">({budgetOverview.provisionalConsumed} €)</span></>,
    "Reste": <>{budgetOverview.summary} € <span className="lowLight">({budgetOverview.provisionalSummary} €)</span></>,

  }));

  return <Table headers={headers} data={budgetData} />;
};

export default BudgetsOverviewTable;
