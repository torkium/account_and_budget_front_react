// Step3TransactionsEdit.tsx
import React, { useCallback, useEffect, useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import SelectField, { Option } from "../../../Form/Fields/Select";
import { ApiFinancialCategoryService } from "../../../../services/apiFinancialCategoryService";
import { CategoryService } from "../../../../services/categoryService";
import Table from "../../../Table/Table";
import { formatDateFrStringToLocalISO, formatDateLocalIsoToFrString } from "../../../../utils/dateUtils";
import { TransactionInterface } from "../../../../interfaces/Transaction";


interface Step3TransactionsEditProps {
  transactionsToFill: TransactionInterface[];
  onEditComplete: (transactions: TransactionInterface[]) => void;
  bankAccountId: number;
}

const Step3TransactionsEdit: React.FC<Step3TransactionsEditProps> = ({
  transactionsToFill,
  onEditComplete,
  bankAccountId,
}) => {
  const apiFinancialCategoryService = new ApiFinancialCategoryService();
  const [financialCategoriesOptions, setFinancialCategoriesOptions] = useState<
    Option[]
  >([]);

  const formTransactions = transactionsToFill.map((t) => ({
    id: t.id,
    reference: t.reference,
    date: formatDateFrStringToLocalISO(t.date),
    label: t.label,
    amount: t.amount,
    financialCategory: t.financialCategory,
  }))

  const defaultValues = {
    transactions: formTransactions,
  };
  const methods = useForm<{ transactions: TransactionInterface[] }>({
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "transactions",
  });

  const onSubmit = methods.handleSubmit((data) => {
    onEditComplete(data.transactions);
  });

  const loadFinancialCategories = useCallback(async () => {
    const categories =
      await apiFinancialCategoryService.get();
    let categoriesFlatten = CategoryService.flattenCategories(categories);
    setFinancialCategoriesOptions([{value:"", label:"Non catégorisé"}, ...categoriesFlatten]);
  }, []);

  useEffect(() => {
    loadFinancialCategories();
  }, []);

  const formData = fields.map((field, index) => ({
    date: formatDateLocalIsoToFrString(field.date),
    id: field.id,
    reference: field.reference,
    label: field.label,
    amount: field.amount,
    financialCategory: (
      <SelectField
        name={`transactions[${index}].financialCategory`}
        options={financialCategoriesOptions}
      />
    ),
  }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <button type="submit">Enregistrer</button>
        <Table
          headers={["date", "label", "amount", "financialCategory"]}
          data={formData}
        />
      </form>
    </FormProvider>
  );
};

export default Step3TransactionsEdit;
