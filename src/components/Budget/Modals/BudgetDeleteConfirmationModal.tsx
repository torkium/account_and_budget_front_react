import React from 'react';
import Modal from "../../Modal/Modal";
import { BudgetInterface } from "../../../interfaces/Budget";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  budget: BudgetInterface | null;
}

const BudgetDeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onDelete, budget }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmez vous cette action ?" size="large">
      <div>
        Confirmez-vous la suppression du budget "{budget?.label}" d'un montant de {budget?.amount} € ?
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

export default BudgetDeleteConfirmationModal;
