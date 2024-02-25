import React, { useState } from "react";
import SelectField from "./Select";
import { useFormContext, RegisterOptions } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectFetcherProps {
  name: string;
  label: string;
  defaultValue?: string;
  validationRules?: RegisterOptions;
}

const SelectFrequency: React.FC<SelectFetcherProps> = ({
  name,
  label,
  validationRules,
  defaultValue,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const { setValue } = useFormContext();

  setOptions([{value:"monthly", label:"Mensuel"}, {value:"weekly", label:"hebdomadaire"}])
  if (defaultValue) {
    setValue(name, defaultValue);
  } else {
    setValue(name, options[0].value);
  }

  return (
    <SelectField
      name={name}
      label={label}
      options={options}
      validationRules={validationRules}
    />
  );
};

export default SelectFrequency;
