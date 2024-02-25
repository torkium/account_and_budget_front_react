import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../Form/Fields/Input";
import { useBankAccountContext } from '../../context/BankAccountContext';
import BankSelect from '../Bank/BankSelect';
import { useBankAccountManager } from '../../hooks/useBankAccountManager';

interface Props {
}

const BankAccountFormEdit: React.FC<Props> = ({  }) => {
  const {bankAccount} = useBankAccountContext()
  const {createOrUpdateBankAccount} = useBankAccountManager({});
  const methods = useForm({
    defaultValues: {
      label: bankAccount.label,
      account_number: bankAccount.account_number,
      bankId: bankAccount.bank.id,
    }
  });

  React.useEffect(() => {
    methods.reset({
      label: bankAccount.label,
      account_number: bankAccount.account_number,
      bankId: bankAccount.bank.id
    });
  }, [bankAccount]);

  const onSubmit = async (formData:any) => {
    let bankAccountCreated = await createOrUpdateBankAccount(bankAccount, formData)
    methods.reset({
      label: bankAccountCreated ? bankAccountCreated.label : bankAccount.label,
      account_number: bankAccountCreated ? bankAccountCreated.account_number : bankAccount.account_number,
      bankId: bankAccountCreated ? bankAccountCreated.bank.id : bankAccount.bank.id
    });
  }

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="label" label="Label" type="text" validationRules={{ required: "Ce champ est requis" }} />
        <InputField name="account_number" label="account_number" type="text" validationRules={{ required: "Ce champ est requis" }} />
        <BankSelect name="bankId" label="Banque" defaultValue={bankAccount?.bank?.id.toString()} validationRules={{ required: "Ce champ est requis" }} />
        <div className="buttons-container">
        <button type="submit">Submit</button>
        </div>
    </form>
    </FormProvider>
  );
};

export default BankAccountFormEdit;
