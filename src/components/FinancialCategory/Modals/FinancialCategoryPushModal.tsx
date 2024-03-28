import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../../generic/Modal/Modal";
import { FinancialCategoryInterface } from "../../../interfaces/FinancialCategory";
import FinancialCategoryFormEdit from "../Forms/FinancialCategoryFormEdit";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  financialCategory?: FinancialCategoryInterface | null;
}

const FinancialCategoryPushModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  financialCategory,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !financialCategory ? "" : financialCategory.label,
      children: !financialCategory ? "" : financialCategory.children,
    });
  }, [financialCategory]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        financialCategory ? "Modifier une catégorie financière" : "Ajouter une catégorie financière"
      }
      size="large"
    >
      <FinancialCategoryFormEdit financialCategory={financialCategory} onSubmit={onSubmit} />
    </Modal>
  );
};

export default FinancialCategoryPushModal;
