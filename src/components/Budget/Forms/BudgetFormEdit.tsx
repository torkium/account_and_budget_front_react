import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../Form/Fields/Input";
import FinancialCategorySelect from "../../FinancialCategory/Forms/FinancialCategorySelect";
import { BudgetInterface } from "../../../interfaces/Budget";
import SelectFrequency from '../../Form/Fields/SelectFrequency';

interface Props {
  budget?: BudgetInterface | null;
  onSubmit: (data: any) => void;
}

const BudgetFormEdit: React.FC<Props> = ({ onSubmit, budget }) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !budget ? "" : budget.label,
      amount: !budget ? "" : budget.amount,
      startDate: !budget ? "" : budget.startDate.split("T")[0],
      endDate: budget?.endDate ? budget.endDate.split("T")[0] : "" ,
      frequency: !budget ? "" : budget.frequency,
      financialCategoryId: !budget ? "" : budget.financialCategory?.id,
    });
  }, [budget]);

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField name="label" label="Label" type="text" validationRules={{ required: "Ce champ est requis" }} />
        <InputField name="amount" label="Amount" type="number" validationRules={{ required: "Ce champ est requis" }} />
        <InputField name="startDate" label="Date de début" type="date" validationRules={{ required: "Ce champ est requis" }} />
        <InputField name="endDate" label="Date de fin" type="date" validationRules={{ }} />
        <SelectFrequency name="frequency" label="Fréquence" validationRules={{ required: "Ce champ est requis" }} />
        <FinancialCategorySelect name="financialCategoryId" label="Catégorie Financière" defaultValue={budget?.financialCategory?.id.toString()} validationRules={{ required: "Ce champ est requis" }} />
        <div className="buttons-container">
        <button type="submit">Submit</button>
        </div>
    </form>
    </FormProvider>
  );
};

export default BudgetFormEdit;
