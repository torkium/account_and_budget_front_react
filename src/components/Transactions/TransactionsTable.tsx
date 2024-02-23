import React from "react";
import Table from "../Table/Table";
import { TransactionInterface } from "../../interfaces/Transaction";

interface TransactionsTableProps {
  transactions: TransactionInterface[];
  onEdit: (transaction: TransactionInterface) => void;
  onDelete: (transaction: TransactionInterface) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onEdit, onDelete }) => {
  const headers = ["Date", "Ref", "Label", "Amount", "Category", "Action"];

  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Ref: transaction.reference,
    Label: transaction.label,
    Amount: `${transaction.amount} €`,
    Category: transaction.financialCategory?.label,
    Action: transaction.id ? (
      <>
        <button onClick={() => onEdit(transaction)}>modifier</button>
        <button className="btn-delete" onClick={() => onDelete(transaction)}>
          x
        </button>
      </>
    ) : (
      <>
      </>
    )
  }));

  return <Table headers={headers} data={transactionData} rowClassName={(rowData) => !rowData["id"] ? "lowlight" : undefined} />;
};

export default TransactionsTable;
