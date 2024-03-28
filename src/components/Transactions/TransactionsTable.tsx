import React from "react";
import Table from "../generic/Table/Table";
import { TransactionInterface } from "../../interfaces/Transaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

interface TransactionsTableProps {
  transactions: TransactionInterface[];
  onEdit: (transaction: TransactionInterface) => void;
  onDelete: (transaction: TransactionInterface) => void;
  onValidate: (transaction: TransactionInterface) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  onValidate,
}) => {
  const headers = ["Date", "Label", "Amount", "Category", "Action"];

  const transactionData = transactions.map((transaction) => ({
    id: transaction.id,
    Date: new Date(transaction.date).toLocaleDateString(),
    Label: transaction.label,
    Amount: `${transaction.amount} €`,
    Category: transaction.financialCategory?.label,
    Action: transaction.id ? (
      <>
        <button onClick={() => onEdit(transaction)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn-delete" onClick={() => onDelete(transaction)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </>
    ) : (
      <>
        <button onClick={() => onEdit(transaction)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn-validate" onClick={() => onValidate(transaction)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </>
    ),
  }));

  return (
    <Table
      headers={headers}
      data={transactionData}
      columnWidths={["5em", "auto", "5em", "10em", "6.75em"]}
      headerAlignments={["left", "left", "center", "left", "center"]}
      contentAlignments={["left", "left", "right", "left", "center"]}
      rowClassName={(rowData) => (!rowData["id"] ? "lowlight" : undefined)}
    />
  );
};

export default TransactionsTable;
