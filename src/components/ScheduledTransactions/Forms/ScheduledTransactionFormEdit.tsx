import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../generic/Form/Fields/Input";
import FinancialCategorySelect from "../../FinancialCategory/Forms/FinancialCategorySelect";
import { ScheduledTransactionInterface } from "../../../interfaces/ScheduledTransaction";
import SelectFrequency from "../../Form/Fields/SelectFrequency";

interface Props {
  scheduledTransaction?: ScheduledTransactionInterface | null;
  onSubmit: (data: any) => void;
}

const ScheduledTransactionFormEdit: React.FC<Props> = ({
  onSubmit,
  scheduledTransaction,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      reference: !scheduledTransaction ? "" : scheduledTransaction.reference,
      label: !scheduledTransaction ? "" : scheduledTransaction.label,
      amount: !scheduledTransaction ? "" : scheduledTransaction.amount,
      startDate: !scheduledTransaction
        ? ""
        : scheduledTransaction.startDate.split("T")[0],
      endDate: scheduledTransaction?.endDate
        ? scheduledTransaction.endDate.split("T")[0]
        : "",
      financialCategoryId: !scheduledTransaction
        ? ""
        : scheduledTransaction.financialCategory?.id,
    });
  }, [scheduledTransaction]);

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
          name="startDate"
          label="Date de début"
          type="date"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <InputField
          name="endDate"
          label="Date de fin"
          type="date"
          validationRules={{}}
        />
        <SelectFrequency
          name="frequency"
          label="Fréquence"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <FinancialCategorySelect
          name="financialCategoryId"
          label="Catégorie Financière"
          defaultValue={scheduledTransaction?.financialCategory?.id.toString()}
          validationRules={{ required: "Ce champ est requis" }}
        />
        <div className="buttons-container">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ScheduledTransactionFormEdit;
