import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import SelectField, { Option } from "../../../Form/Fields/Select";

interface HeadersMappingForm {
  date: string;
  amount: string;
  libelle: string;
}

interface Step2HeadersMappingProps {
  headersOptions: Option[];
  fileToImport: File;
  onSubmit: (data: HeadersMappingForm) => void;
}

const Step2HeadersMapping: React.FC<Step2HeadersMappingProps> = ({ headersOptions, fileToImport, onSubmit }) => {
  const methods = useForm<HeadersMappingForm>();

  return (
    <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <SelectField name="date" label="Date" options={headersOptions} />
      <SelectField name="amount" label="Montant" options={headersOptions} />
      <SelectField name="libelle" label="Libellé" options={headersOptions} />
      <button type="submit">Next</button>
    </form>
  </FormProvider>
  );
};

export default Step2HeadersMapping;