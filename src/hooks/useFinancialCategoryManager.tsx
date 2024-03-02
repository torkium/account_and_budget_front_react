import { FinancialCategoryInterface } from "../interfaces/FinancialCategory";
import { ApiFinancialCategoryService } from "../services/apiFinancialCategoryService";
import { useAlert } from "../context/AlertContext";

interface UseFinancialCategoryManagerProps {
  reloadFinancialCategories?: () => void;
}

export const useFinancialCategoryManager = ({ reloadFinancialCategories }: UseFinancialCategoryManagerProps) => {
  const { showAlert } = useAlert();

  const submitFinancialCategory = async (financialCategory: FinancialCategoryInterface | null, formData: any) => {
    try {
      const apiFinancialCategoryService = new ApiFinancialCategoryService();
      const newFinancialCategoryData = {
        id: financialCategory?.id ?? undefined,
        ...formData,
      };

      await apiFinancialCategoryService.push(newFinancialCategoryData, financialCategory?.id ?? undefined);
      reloadFinancialCategories && reloadFinancialCategories();
      financialCategory?.id ? showAlert("Modifications enregistrées.", "success") : showAlert("Catégorie financière créée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  const deleteFinancialCategory = async (financialCategory: FinancialCategoryInterface) => {
    try {
      const apiFinancialCategoryService = new ApiFinancialCategoryService();
      await apiFinancialCategoryService.remove(financialCategory.id);
      reloadFinancialCategories && reloadFinancialCategories();
      showAlert("Suppression confirmée.", "success");
    } catch (error) {
      showAlert("Une erreur est survenue.", "error");
    }
  };

  return {
    submitFinancialCategory,
    deleteFinancialCategory,
  };
};
