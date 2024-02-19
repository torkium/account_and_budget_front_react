import React from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  name: string
  label: string
  options: Option[]
  validationRules?: RegisterOptions
}

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, validationRules }) => {
  const { register, formState: { errors } } = useFormContext()

  const errorMessage = (name: string): string | null => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : null
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} {...register(name, validationRules)}>
        {options.map(option => (
          <option value={option.value} key={option.value}>{option.label}</option>
        ))}
      </select>
      {errorMessage(name) && <p className="error">{errorMessage(name)}</p>}
    </div>
  )
}

export default SelectField
