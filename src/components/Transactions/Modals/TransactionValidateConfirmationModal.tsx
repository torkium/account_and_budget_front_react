import React from 'react';
import Modal from "../../generic/Modal/Modal";
import { TransactionInterface } from "../../../interfaces/Transaction";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  transaction: TransactionInterface | null;
}

const TransactionValidateConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onDelete, transaction }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmez vous cette action ?" size="large">
      <div>
        Confirmez-vous que la transaction prévisionnelle "{transaction?.label}" d'un montant de {transaction?.amount} € est déjà dans vos transactions réelles ?
        <div className="buttons-container">
          <button className="btn-validate" onClick={onDelete}>
            Confirmer
          </button>
          <button onClick={onClose}>Annuler</button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionValidateConfirmationModal;
