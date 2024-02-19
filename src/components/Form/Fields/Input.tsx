import React, { useState } from 'react'
import { useFormContext, RegisterOptions } from 'react-hook-form'

interface InputFieldProps {
  name: string
  label: string
  type?: string
  validationRules?: RegisterOptions
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type = "text", validationRules }) => {
  const { register, formState: { errors }, setValue } = useFormContext()
  const [inputValue, setInputValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (type === "number" && value) {
      const normalizedValue = value.replace(',', '.')
      const decimalPattern = /^-?\d*\.?\d*$/
      let cleanedValue = normalizedValue.replace(/[^0-9.-]/g, '')

      if (!decimalPattern.test(normalizedValue) || normalizedValue === ".") {
        cleanedValue = normalizedValue.slice(0, -1)
      }
      setValue(name, cleanedValue)
      setInputValue(cleanedValue)
    } else {
      setInputValue(value)
      setValue(name, value)
    }
  }

  const errorMessage = (name: string): string | null => {
    const error = errors[name]
    return error && typeof error.message === 'string' ? error.message : null
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input 
        type={type === "number" ? "text" : type} 
        id={name}
        {...register(name, validationRules)} 
        value={inputValue}
        onChange={handleChange}
      />
      {errorMessage(name) && <p className="error">{errorMessage(name)}</p>}
    </div>
  )
}

export default InputField
