import React from 'react';
import Modal from "../../Modal/Modal";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  scheduledTransaction: ScheduledTransactionInterface | null;
}

const ScheduledTransactionDeleteConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onDelete, scheduledTransaction }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmez vous cette action ?" size="large">
      <div>
        Confirmez-vous la suppression de la transaction programmée "{scheduledTransaction?.label}" d'un montant de {scheduledTransaction?.amount} € ?
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

export default ScheduledTransactionDeleteConfirmationModal;
