import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../../generic/Modal/Modal";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";
import ScheduledTransactionFormEdit from "../Forms/ScheduledTransactionFormEdit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  scheduledTransaction?: ScheduledTransactionInterface | null;
}

const ScheduledTransactionPushModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  scheduledTransaction,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !scheduledTransaction ? "" : scheduledTransaction.label,
      amount: !scheduledTransaction ? "" : scheduledTransaction.amount,
      startDate: !scheduledTransaction ? "" : scheduledTransaction.startDate.split("T")[0],
      endDate: scheduledTransaction?.endDate ? scheduledTransaction.endDate.split("T")[0] : "" ,
      financialCategoryId: !scheduledTransaction
        ? ""
        : scheduledTransaction.financialCategory?.id,
    });
  }, [scheduledTransaction]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        scheduledTransaction ? "Modifier une transaction prévisionnelle" : "Ajouter une transaction prévisionnelle"
      }
      size="large"
    >
      <ScheduledTransactionFormEdit scheduledTransaction={scheduledTransaction} onSubmit={onSubmit} />
    </Modal>
  );
};

export default ScheduledTransactionPushModal;
