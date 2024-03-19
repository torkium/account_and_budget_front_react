import React from "react";
import Table from "../../Table/Table";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ScheduledTransactionsOnceTableProps {
  scheduledTransactions: ScheduledTransactionInterface[];
  onEdit: (scheduledTransaction: ScheduledTransactionInterface) => void;
  onDelete: (scheduledTransaction: ScheduledTransactionInterface) => void;
}

const ScheduledTransactionsOnceTable: React.FC<
  ScheduledTransactionsOnceTableProps
> = ({ scheduledTransactions, onEdit, onDelete }) => {
  const headers = ["Date", "Label", "Montant", "Catégorie", "Action"];

  const scheduledTransactionData = scheduledTransactions.map(
    (scheduledTransaction) => ({
      id: scheduledTransaction.id,
      Date: new Date(scheduledTransaction.startDate).toLocaleDateString(),
      Label: scheduledTransaction.label,
      Montant: `${scheduledTransaction.amount} €`,
      Catégorie: scheduledTransaction.financialCategory?.label,
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
      columnWidths={["8em", "auto", "5em", "5em", "7em"]}
      headerAlignments={["left", "left", "center", "center", "center"]}
      contentAlignments={["left", "left", "right", "left", "center"]}
      rowClassName={(rowData) => (!rowData["id"] ? "lowlight" : undefined)}
    />
  );
};

export default ScheduledTransactionsOnceTable;
