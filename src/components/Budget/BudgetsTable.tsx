import React from "react";
import Table from "../generic/Table/Table";
import { BudgetInterface } from "../../interfaces/Budget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface BudgetsTableProps {
  budgets: BudgetInterface[];
  onEdit: (budget: BudgetInterface) => void;
  onDelete: (budget: BudgetInterface) => void;
}

const BudgetsTable: React.FC<BudgetsTableProps> = ({
  budgets,
  onEdit,
  onDelete,
}) => {
  const headers = [
    "Date de début",
    "Date de fin",
    "Label",
    "Montant",
    "Fréquence",
    "Catégorie",
    "Action",
  ];

  const budgetData = budgets.map((budget) => ({
    id: budget.id,
    "Date de début": new Date(budget.startDate).toLocaleDateString(),
    "Date de fin": budget.endDate
      ? new Date(budget.endDate).toLocaleDateString()
      : "",
    Label: budget.label,
    Montant: `${budget.amount} €`,
    Fréquence: budget.frequency,
    Catégorie: budget.financialCategory?.label,
    Action: budget.id ? (
      <>
        <button onClick={() => onEdit(budget)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn-delete" onClick={() => onDelete(budget)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </>
    ) : (
      <></>
    ),
  }));

  return (
    <Table
      headers={headers}
      columnWidths={["8em", "8em", "auto", "5em", "5em", "5em", "7em"]}
      headerAlignments={["left", "left", "left", "center", "center", "center"]}
      contentAlignments={["left", "left", "left", "right", "left", "center"]}
      data={budgetData}
    />
  );
};

export default BudgetsTable;
