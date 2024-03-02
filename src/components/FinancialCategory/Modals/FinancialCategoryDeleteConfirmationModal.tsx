import React from 'react';
import Modal from "../../Modal/Modal";
import { FinancialCategoryInterface } from "../../../interfaces/FinancialCategory";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  financialCategory: FinancialCategoryInterface | null;
}

const FinancialCategoryDeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onDelete, financialCategory }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmez vous cette action ?" size="large">
      <div>
        Confirmez-vous la suppression de la catégorie "{financialCategory?.label}" ?
        <div className="buttons-container">
          <button className="btn-delete" onClick={onDelete}>
            Confirmer
          </button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </Modal>
  );
};

export default FinancialCategoryDeleteConfirmationModal;
