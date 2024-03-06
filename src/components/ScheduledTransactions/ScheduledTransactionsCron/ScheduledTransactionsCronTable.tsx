import React from "react";
import Table from "../../Table/Table";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ScheduledTransactionsCronTableProps {
  scheduledTransactions: ScheduledTransactionInterface[];
  onEdit: (scheduledTransaction: ScheduledTransactionInterface) => void;
  onDelete: (scheduledTransaction: ScheduledTransactionInterface) => void;
}

const ScheduledTransactionsCronTable: React.FC<
  ScheduledTransactionsCronTableProps
> = ({ scheduledTransactions, onEdit, onDelete }) => {
  const headers = [
    "Date de début",
    "Date de fin",
    "Label",
    "Montant",
    "Catégorie",
    "Fréquence",
    "Action",
  ];

  const scheduledTransactionData = scheduledTransactions.map(
    (scheduledTransaction) => ({
      id: scheduledTransaction.id,
      "Date de début": new Date(
        scheduledTransaction.startDate
      ).toLocaleDateString(),
      "Date de fin": scheduledTransaction.endDate
        ? new Date(scheduledTransaction.endDate).toLocaleDateString()
        : "",
      Label: scheduledTransaction.label,
      Montant: `${scheduledTransaction.amount} €`,
      Catégorie: scheduledTransaction.financialCategory?.label,
      Fréquence: scheduledTransaction.frequency,
      Action: scheduledTransaction.id ? (
        <>
          <button onClick={() => onEdit(scheduledTransaction)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(scheduledTransaction)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      ) : (
        <></>
      ),
    })
  );

  return (
    <Table
      headers={headers}
      data={scheduledTransactionData}
      columnWidths={["8em", "8em", "auto", "5em", "5em", "5em", "7em"]}
      headerAlignments={["left", "left", "left", "center", "center", "center"]}
      contentAlignments={["left", "left", "left", "right", "left", "center"]}
      rowClassName={(rowData) => (!rowData["id"] ? "lowlight" : undefined)}
    />
  );
};

export default ScheduledTransactionsCronTable;
