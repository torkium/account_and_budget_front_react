import React from 'react';
import { useForm } from "react-hook-form";
import Modal from "../../../Modal/Modal";
import { BankAccountInterface } from '../../../../interfaces/Bank';
import BankAccountFormEdit from '../../../BankAccount/Forms/BankAccountFormEdit';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  bankAccount?: BankAccountInterface;
}

const BankAccountPushModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, bankAccount }) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !bankAccount ? "" : bankAccount.label,
      account_number: !bankAccount ? "" : bankAccount.account_number,
    });
  }, [bankAccount, methods.reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={bankAccount ? "Modifier un compte" : "Ajouter un compte"} size="large">
      <BankAccountFormEdit bankAccount={bankAccount} onSubmit={onSubmit} />
    </Modal>
  );
};

export default BankAccountPushModal;
