import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../generic/Form/Fields/Input";
import FinancialCategorySelect from "./FinancialCategorySelect";
import { FinancialCategoryInterface } from "../../../interfaces/FinancialCategory";
import SelectFinancialCategoryType from "../../Form/Fields/SelectFinancialCategoryType";

interface Props {
  financialCategory?: FinancialCategoryInterface | null;
  onSubmit: (data: any) => void;
}

const FinancialCategoryFormEdit: React.FC<Props> = ({
  onSubmit,
  financialCategory,
}) => {
  const methods = useForm();

  React.useEffect(() => {
    methods.reset({
      label: !financialCategory ? "" : financialCategory.label,
      parent_id: !financialCategory ? "" : financialCategory.parentId,
    });
  }, [financialCategory]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputField
          name="label"
          label="Label"
          type="text"
          validationRules={{ required: "Ce champ est requis" }}
        />
        <SelectFinancialCategoryType
          name="type"
          label="Type de catégorie"
          defaultValue={financialCategory?.type?.toString()}
        />
        <FinancialCategorySelect
          name="parent_id"
          label="Parent"
          defaultValue={financialCategory?.parentId?.toString()}
        />
        <div className="buttons-container">
          <button type="submit">Enregistrer</button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FinancialCategoryFormEdit;
