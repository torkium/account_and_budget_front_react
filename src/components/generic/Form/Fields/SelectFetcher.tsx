import React, { useEffect, useState } from "react";
import SelectField from "./Select";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { useAlert } from "../../../../context/generic/AlertContext";

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
  emptyChoice?: Option;
  reload?: Boolean;
}
//
const SelectFetcher: React.FC<SelectFetcherProps> = ({
  name,
  label,
  validationRules,
  defaultValue,
  loadOptionsFunction,
  emptyChoice,
  reload = false
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const { setValue } = useFormContext();
  const { showAlert } = useAlert();

  const fetchOptions = async () => {
    setOptions(  [ {value:"", label:"Chargement en cours..."}])
    setisLoading(true)
    try {
      const loadedOptions = await loadOptionsFunction();
      setisLoading(false)
      setOptions(emptyChoice ? [emptyChoice, ...loadedOptions] : [...loadedOptions]);
    } catch (error) {
      showAlert("Unable to fetch options", "error");
    }
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {
    if (!isLoading && defaultValue !== undefined && defaultValue !== null) {
      setValue(name, defaultValue);
    } else if (!isLoading && options.length > 0) {
      setValue(name, options[0].value);
    }
  }, [options]);

  useEffect(() => {
    if(reload){
      fetchOptions();
    }
  }, [reload]);

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
