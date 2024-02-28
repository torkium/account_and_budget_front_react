import { BudgetInterface } from "../interfaces/Budget";
import { ApiBudgetService } from "../services/apiBudgetService";
import { useAlert } from "../context/AlertContext";

interface UseBudgetManagerProps {
  bankAccountId: number;
  reloadBudgets?: () => void;
}

export const useBudgetManager = ({ bankAccountId, reloadBudgets }: UseBudgetManagerProps) => {
  const { showAlert } = useAlert();
  const apiBudgetService = new ApiBudgetService(bankAccountId);

  const submitBudget = async (budget: BudgetInterface | null, formData: any) => {
    if (!bankAccountId) {
      showAlert("Une erreur est survenue..", "error");
      return;
    }
    try {
      const newBudgetData = {
        id: budget?.id ?? undefined,
        ...formData,
        amount: parseFloat(formData.amount),
        financialCategory: parseInt(formData.financialCategoryId),
      };

      await apiBudgetService.push(newBudgetData, budget?.id ?? undefined);
      if(reloadBudgets) reloadBudgets();
      budget?.id ? showAlert("Modifications enregistrées.", "success") : showAlert("Création confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue..", "error");
    }
  };

  const deleteBudget = async (budget: BudgetInterface) => {
    if (!bankAccountId || !budget?.id) {
      showAlert("Une erreur est survenue..", "error");
      return;
    }

    try {
      await apiBudgetService.remove(budget.id);
      if(reloadBudgets) reloadBudgets();
      showAlert("Suppression confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue..", "error");
    }
  };

  return {
    submitBudget,
    deleteBudget,
  };
};
