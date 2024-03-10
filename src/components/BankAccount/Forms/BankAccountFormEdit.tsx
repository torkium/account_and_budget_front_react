import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../Form/Fields/Input";
import BankSelect from "../../Bank/BankSelect";
import { BankAccountInterface } from "../../../interfaces/Bank";

interface Props {
  bankAccount?: BankAccountInterface;
  onSubmit: (data: any) => void;
  allowSetInitialFromActualBalance?: boolean;
}

const BankAccountFormEdit: React.FC<Props> = ({
  bankAccount,
  onSubmit,
  allowSetInitialFromActualBalance = false,
}) => {
  const methods = useForm({
    defaultValues: {
      label: bankAccount?.label,
      account_number: bankAccount?.account_number,
      initial_amount: bankAccount?.initial_amount,
      actual_balance: null,
      bankId: bankAccount?.bank.id,
    },
  });

  React.useEffect(() => {
    methods.reset({
      label: bankAccount?.label,
      account_number: bankAccount?.account_number,
      initial_amount: bankAccount?.initial_amount,
      actual_balance: null,
      bankId: bankAccount?.bank.id,
    });
  }, [bankAccount]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          name="label"
          label="Label"
          type="text"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <InputField
          name="account_number"
          label="Numéro de compte"
          type="text"
        />
        <InputField name="initial_amount" label="Solde initial" type="number" />
        {allowSetInitialFromActualBalance && (
          <InputField
            name="actual_balance"
            label="Initialiser le solde initial depuis le solde actuel"
            type="number"
          />
        )}
        <BankSelect
          name="bankId"
          label="Banque"
          defaultValue={bankAccount?.bank?.id.toString()}
          validationRules={{ required: "Ce champ est requis" }}
        />
        <div className="buttons-container">
          <button type="submit" disabled={!methods.formState.isValid}>
            Enregistrer
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default BankAccountFormEdit;
