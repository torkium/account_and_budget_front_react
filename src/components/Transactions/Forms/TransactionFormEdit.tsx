import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../generic/Form/Fields/Input";
import FinancialCategorySelect from "../../FinancialCategory/Forms/FinancialCategorySelect";
import { TransactionInterface } from "../../../interfaces/Transaction";

interface Props {
  transaction?: TransactionInterface | null;
  onSubmit: (data: any) => void;
}

const TransactionFormEdit: React.FC<Props> = ({ onSubmit, transaction }) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      reference: !transaction ? "" : transaction.reference,
      label: !transaction ? "" : transaction.label,
      amount: !transaction ? "" : transaction.amount,
      date: !transaction ? "" : transaction.date.split("T")[0],
      financialCategoryId: !transaction
        ? ""
        : transaction.financialCategory?.id,
    });
  }, [transaction]);

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
          name="amount"
          label="Amount"
          type="number"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <InputField
          name="date"
          label="Date"
          type="date"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <FinancialCategorySelect
          name="financialCategoryId"
          label="Catégorie Financière"
          defaultValue={transaction?.financialCategory?.id.toString()}
        />
        <div className="buttons-container">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TransactionFormEdit;
