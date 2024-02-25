import React from "react";
import Table from "../Table/Table";
import { BudgetInterface } from "../../interfaces/Budget";

interface BudgetsTableProps {
  budgets: BudgetInterface[];
  onEdit: (budget: BudgetInterface) => void;
  onDelete: (budget: BudgetInterface) => void;
}

const BudgetsTable: React.FC<BudgetsTableProps> = ({ budgets, onEdit, onDelete }) => {
  const headers = ["StartDate", "EndDate", "Label", "Amount", "Frequency", "Category", "Action"];

  const budgetData = budgets.map((budget) => ({
    id: budget.id,
    StartDate: new Date(budget.startDate).toLocaleDateString(),
    EndDate: budget.endDate ? new Date(budget.endDate).toLocaleDateString() : "",
    Label: budget.label,
    Amount: `${budget.amount} €`,
    Frequency: budget.frequency,
    Category: budget.financialCategory?.label,
    Action: budget.id ? (
      <>
        <button onClick={() => onEdit(budget)}>modifier</button>
        <button className="btn-delete" onClick={() => onDelete(budget)}>
          x
        </button>
      </>
    ) : (
      <>
      </>
    )
  }));

  return <Table headers={headers} data={budgetData} />;
};

export default BudgetsTable;
