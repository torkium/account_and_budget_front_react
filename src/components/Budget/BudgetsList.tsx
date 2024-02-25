import React, { useCallback, useState } from "react";
import { useBankAccountContext } from "../../context/BankAccountContext";
import BudgetsTable from "./BudgetsTable";
import BudgetPushModal from "./Modals/BudgetPushModal";
import BudgetDeleteConfirmationModal from "./Modals/BudgetDeleteConfirmationModal";
import { BudgetInterface } from "../../interfaces/Budget";
import { useBudgetManager } from "../../hooks/useBudgetManager";

const BudgetsList: React.FC = () => {
  const { bankAccount, budgets, reloadBudgets } = useBankAccountContext();

  // State hooks
  const [isBudgetPushModalOpen, setIsBudgetPushModalOpen] =
    useState(false);
  const [
    isBudgetDeleteConfirmationModalOpen,
    setIsBudgetDeleteConfirmationModalOpen,
  ] = useState(false);
  const [selectedBudget, setSelectedBudget] =
    useState<BudgetInterface | null>(null);

  const { submitBudget, deleteBudget } = useBudgetManager({
    bankAccountId: bankAccount?.id ?? null,
    reloadBudgets,
  });

  // Callbacks for user actions
  const openBudgetPushModal = useCallback(
    (budget?: BudgetInterface) => {
      setSelectedBudget(budget || null);
      setIsBudgetPushModalOpen(true);
    },
    []
  );

  const closeBudgetPushModal = useCallback(() => {
    setIsBudgetPushModalOpen(false);
    setSelectedBudget(null);
  }, []);

  const openDeleteConfirmationModal = useCallback(
    (budget: BudgetInterface) => {
      setSelectedBudget(budget);
      setIsBudgetDeleteConfirmationModalOpen(true);
    },
    []
  );

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsBudgetDeleteConfirmationModalOpen(false);
    setSelectedBudget(null);
  }, []);

  //Handle Forms
  const handleSubmit = useCallback(
    (formData: any) => {
      if (selectedBudget) {
        submitBudget(selectedBudget, formData);
      } else {
        submitBudget(null, formData);
      }
      closeBudgetPushModal();
    },
    [submitBudget, selectedBudget]
  );

  const handleDelete = useCallback(() => {
    if (selectedBudget) {
      deleteBudget(selectedBudget);
    }
    setIsBudgetDeleteConfirmationModalOpen(false);
  }, [deleteBudget, selectedBudget]);

  return (
    <>
      <button onClick={() => openBudgetPushModal()}>Ajouter</button>
      <BudgetsTable
        budgets={budgets}
        onEdit={openBudgetPushModal}
        onDelete={openDeleteConfirmationModal}
      />
      <BudgetPushModal
        isOpen={isBudgetPushModalOpen}
        onClose={closeBudgetPushModal}
        onSubmit={handleSubmit}
        budget={selectedBudget}
      />
      <BudgetDeleteConfirmationModal
        isOpen={isBudgetDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={handleDelete}
        budget={selectedBudget}
      />
    </>
  );
};

export default BudgetsList;
