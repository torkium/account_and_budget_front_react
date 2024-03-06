import React, { useCallback, useEffect, useState } from "react";
import FinancialCategoriesTable from "./FinancialCategoryTable";
import FinancialCategoryPushModal from "./Modals/FinancialCategoryPushModal";
import FinancialCategoryDeleteConfirmationModal from "./Modals/FinancialCategoryDeleteConfirmationModal";
import { FinancialCategoryInterface } from "../../interfaces/FinancialCategory";
import { useFinancialCategoryManager } from "../../hooks/useFinancialCategoryManager";
import { ApiFinancialCategoryService } from "../../services/apiFinancialCategoryService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FinancialCategoriesList: React.FC = () => {
  const apiFinancialCategoryService = new ApiFinancialCategoryService();
  // State hooks
  const [
    isFinancialCategoryPushModalOpen,
    setIsFinancialCategoryPushModalOpen,
  ] = useState(false);
  const [financialCategories, setFinancialCategories] = useState<
    FinancialCategoryInterface[]
  >([]);

  const [
    isFinancialCategoryDeleteConfirmationModalOpen,
    setIsFinancialCategoryDeleteConfirmationModalOpen,
  ] = useState(false);
  const [selectedFinancialCategory, setSelectedFinancialCategory] =
    useState<FinancialCategoryInterface | null>(null);

  const { submitFinancialCategory, deleteFinancialCategory } =
    useFinancialCategoryManager({
      reloadFinancialCategories: () => {
        getFinancialCategories();
      },
    });

  // Callbacks for user actions
  const openFinancialCategoryPushModal = useCallback(
    (financialCategory?: FinancialCategoryInterface) => {
      setSelectedFinancialCategory(financialCategory || null);
      setIsFinancialCategoryPushModalOpen(true);
    },
    []
  );

  const closeFinancialCategoryPushModal = useCallback(() => {
    setIsFinancialCategoryPushModalOpen(false);
    setSelectedFinancialCategory(null);
  }, []);

  const openDeleteConfirmationModal = useCallback(
    (financialCategory: FinancialCategoryInterface) => {
      setSelectedFinancialCategory(financialCategory);
      setIsFinancialCategoryDeleteConfirmationModalOpen(true);
    },
    []
  );

  const closeDeleteConfirmationModal = useCallback(() => {
    setIsFinancialCategoryDeleteConfirmationModalOpen(false);
    setSelectedFinancialCategory(null);
  }, []);

  //Handle Forms
  const handleSubmit = useCallback(
    (formData: any) => {
      if (selectedFinancialCategory) {
        submitFinancialCategory(selectedFinancialCategory, formData);
      } else {
        submitFinancialCategory(null, formData);
      }
      closeFinancialCategoryPushModal();
    },
    [submitFinancialCategory, selectedFinancialCategory]
  );

  const handleDelete = useCallback(() => {
    if (selectedFinancialCategory) {
      deleteFinancialCategory(selectedFinancialCategory);
    }
    setIsFinancialCategoryDeleteConfirmationModalOpen(false);
  }, [deleteFinancialCategory, selectedFinancialCategory]);

  const getFinancialCategories = async () => {
    setFinancialCategories(await apiFinancialCategoryService.get());
  };

  useEffect(() => {
    getFinancialCategories();
  }, []);

  return (
    <>
      <button onClick={() => openFinancialCategoryPushModal()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>{" "}
      <FinancialCategoriesTable
        financialCategories={financialCategories}
        onEdit={openFinancialCategoryPushModal}
        onDelete={openDeleteConfirmationModal}
      />
      <FinancialCategoryPushModal
        isOpen={isFinancialCategoryPushModalOpen}
        onClose={closeFinancialCategoryPushModal}
        onSubmit={handleSubmit}
        financialCategory={selectedFinancialCategory}
      />
      <FinancialCategoryDeleteConfirmationModal
        isOpen={isFinancialCategoryDeleteConfirmationModalOpen}
        onClose={closeDeleteConfirmationModal}
        onDelete={handleDelete}
        financialCategory={selectedFinancialCategory}
      />
    </>
  );
};

export default FinancialCategoriesList;
