import React, { useEffect, useState } from "react";
import SelectField from "./Select";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { useAlert } from "../../../context/AlertContext";

interface Option {
  value: string;
  label: string;
}

interface SelectFetcherProps {
  name: string;
  label: string;
  defaultValue?: string;
  validationRules?: RegisterOptions;
  loadOptionsFunction: () => Promise<Option[]>;
}

const SelectFetcher: React.FC<SelectFetcherProps> = ({
  name,
  label,
  validationRules,
  defaultValue,
  loadOptionsFunction,
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { setValue } = useFormContext();
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchOptions = async () => {
      setOptions(  [ {value:"", label:"Chargement en cours..."}])
      setisLoading(true)
      try {
        const loadedOptions = await loadOptionsFunction();
        setOptions(loadedOptions);

        if (defaultValue) {
          setValue(name, defaultValue);
        } else if (loadedOptions.length > 0) {
          setValue(name, loadedOptions[0].value);
        }
        setisLoading(false)
      } catch (error) {
        showAlert("Unable to fetch options", "error");
      }
    };

    fetchOptions();
  }, [name, defaultValue, loadOptionsFunction]);

  return (
    <SelectField
      name={name}
      label={label}
      options={options}
      validationRules={validationRules}
    />
  );
};

export default SelectFetcher;
