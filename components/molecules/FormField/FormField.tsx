import React from 'react';
import { Input } from '../../atoms/Input/Input';
import { Text } from '../../atoms/Text/Text';

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  error,
  required,
  disabled,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block mb-2">
        <Text variant="body" weight="medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Text>
      </label>
      
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        error={!!error}
        disabled={disabled}
        onChange={onChange}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      
      {error && (
        <div id={`${name}-error`} className="mt-1" role="alert">
          <Text variant="small" color="text-red-500">
            {error}
          </Text>
        </div>
      )}
    </div>
  );
};
