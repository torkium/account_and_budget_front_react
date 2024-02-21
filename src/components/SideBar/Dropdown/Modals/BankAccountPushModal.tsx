import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import Modal from "../../../Modal/Modal";
import InputField from "../../../Form/Fields/Input";
import { BankAccountInterface } from '../../../../interfaces/Bank';
import BankSelect from '../../../Bank/BankSelect';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  bankAccount?: BankAccountInterface | null;
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField name="label" label="Label" type="text" validationRules={{ required: "Ce champ est requis" }} />
          <InputField name="account_number" label="account_number" type="text" validationRules={{ required: "Ce champ est requis" }} />
          <BankSelect name="bank_id" label="Banque" defaultValue={bankAccount?.bank?.id.toString()} validationRules={{ required: "Ce champ est requis" }} />
          <div className="buttons-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default BankAccountPushModal;
