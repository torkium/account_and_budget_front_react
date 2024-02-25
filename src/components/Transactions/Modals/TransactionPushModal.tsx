import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { TransactionInterface } from "../../../interfaces/Transaction";
import TransactionFormEdit from "../Forms/TransactionFormEdit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transaction?: TransactionInterface | null;
}

const TransactionPushModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  transaction,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      reference: !transaction ? "" : transaction.reference,
      label: !transaction ? "" : transaction.label,
      amount: !transaction ? "" : transaction.amount,
      date: !transaction ? "" : transaction.date.split("T")[0],
      financialCategoryId: !transaction
        ? ""
        : transaction.financialCategory?.id,
    });
  }, [transaction]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        transaction ? "Modifier une transaction" : "Ajouter une transaction"
      }
      size="large"
    >
      <TransactionFormEdit transaction={transaction} onSubmit={onSubmit} />
    </Modal>
  );
};

export default TransactionPushModal;
