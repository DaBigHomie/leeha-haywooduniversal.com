import React from 'react';
import { Input, type InputProps } from '@/components/atoms/Input/Input';
import { Text } from '@/components/atoms/Text/Text';

export interface FormFieldProps extends Omit<InputProps, 'label' | 'error'> {
  label: string;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helpText,
  required,
  ...inputProps
}) => {
  return (
    <div className="w-full">
      <Input
        label={label}
        error={error}
        required={required}
        fullWidth
        {...inputProps}
      />
      {helpText && !error && (
        <Text variant="caption" className="mt-1">
          {helpText}
        </Text>
      )}
    </div>
  );
};
