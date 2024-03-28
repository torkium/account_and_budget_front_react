import React, { useState } from "react";
import SelectField from "../../generic/Form/Fields/Select";
import { RegisterOptions } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface SelectFrequencyProps {
  name: string;
  label: string;
  validationRules?: RegisterOptions;
}

const SelectFrequency: React.FC<SelectFrequencyProps> = ({
  name,
  label,
  validationRules,
}) => {
  const [options, setOptions] = useState<Option[]>([{value:"monthly", label:"Mensuel"}, {value:"weekly", label:"hebdomadaire"}]);

  return (
    <SelectField
      name={name}
      label={label}
      options={options}
      defaultValue={options[0].value}
      validationRules={validationRules}
    />
  );
};

export default SelectFrequency;