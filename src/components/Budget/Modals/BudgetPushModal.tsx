import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../../Modal/Modal";
import { BudgetInterface } from "../../../interfaces/Budget";
import BudgetFormEdit from "../Forms/BudgetFormEdit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  budget?: BudgetInterface | null;
}

const BudgetPushModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  budget,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !budget ? "" : budget.label,
      amount: !budget ? "" : budget.amount,
      startDate: !budget ? "" : budget.startDate.split("T")[0],
      endDate: !budget ? "" : budget.endDate.split("T")[0],
      frequency: !budget
        ? ""
        : budget.frequency,
      financialCategoryId: !budget
          ? ""
          : budget.financialCategory?.id,
    });
  }, [budget]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        budget ? "Modifier un budget" : "Ajouter un budget"
      }
      size="large"
    >
      <BudgetFormEdit budget={budget} onSubmit={onSubmit} />
    </Modal>
  );
};

export default BudgetPushModal;
