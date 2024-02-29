import React from "react";
import Table from "../../Table/Table";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";

interface ScheduledTransactionsOnceTableProps {
  scheduledTransactions: ScheduledTransactionInterface[];
  onEdit: (scheduledTransaction: ScheduledTransactionInterface) => void;
  onDelete: (scheduledTransaction: ScheduledTransactionInterface) => void;
}

const ScheduledTransactionsOnceTable: React.FC<ScheduledTransactionsOnceTableProps> = ({ scheduledTransactions, onEdit, onDelete }) => {
  const headers = ["Date", "Label", "Amount", "Category", "Action"];

  const scheduledTransactionData = scheduledTransactions.map((scheduledTransaction) => ({
    id: scheduledTransaction.id,
    "Date": new Date(scheduledTransaction.startDate).toLocaleDateString(),
    Label: scheduledTransaction.label,
    Amount: `${scheduledTransaction.amount} €`,
    Category: scheduledTransaction.financialCategory?.label,
    Action: scheduledTransaction.id ? (
      <>
        <button onClick={() => onEdit(scheduledTransaction)}>modifier</button>
        <button className="btn-delete" onClick={() => onDelete(scheduledTransaction)}>
          x
        </button>
      </>
    ) : (
      <>
      </>
    )
  }));

  return <Table headers={headers} data={scheduledTransactionData} rowClassName={(rowData) => !rowData["id"] ? "lowlight" : undefined} />;
};

export default ScheduledTransactionsOnceTable;
