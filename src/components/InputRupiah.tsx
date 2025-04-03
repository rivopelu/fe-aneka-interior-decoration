import { twMerge } from 'tailwind-merge';
import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, ReactNode, useState, useEffect } from 'react';
import { useFormikContext, FormikErrors, FormikTouched } from 'formik';
import LabelInputField from './LabelInputField.tsx';

export default function InputRupiah(props: IProps) {
  const formik = useFormikContext<any>();
  const [displayValue, setDisplayValue] = useState('');

  const errors = formik?.errors as FormikErrors<Record<string, any>>;
  const touched = formik?.touched as FormikTouched<Record<string, any>>;

  const errorMessage = props.errorMessage ?? (errors?.[props.name] && touched?.[props.name] ? errors[props.name] : '');

  useEffect(() => {
    if (props.value) {
      setDisplayValue(formatRupiah(props.value));
    } else {
      setDisplayValue('');
    }
  }, [props.value]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');

    formik?.setFieldValue(props.name, inputValue);

    if (inputValue) {
      setDisplayValue(formatRupiah(inputValue));
    } else {
      setDisplayValue('');
    }

    if (props.onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: inputValue
        }
      };
      props.onChange(syntheticEvent as any);
    }
  };

  function formatRupiah(value: string) {
    if (!value) return '';
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue)) return '';

    return new Intl.NumberFormat('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numberValue);
  }

  return (
    <div className="grid gap-1">
      {props.label && <LabelInputField label={props.label} required={props.required} />}
      <div className={twMerge('relative flex items-center bg-white')}>
        <span className="absolute left-3 flex items-center">Rp</span>
        <input
          autoComplete={props.autoComplete}
          onBlur={props.onBlur ?? formik?.handleBlur}
          onChange={handleChange}
          value={displayValue}
          name={props.name}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && props.onEnter) {
              props.onEnter();
            }
          }}
          type={props.type || 'text'}
          placeholder={props.placeholder || ''}
          className={twMerge(
            'h-field-height w-full px-3 pl-9 duration-300 bg-white outline-2 outline-gray-300 rounded-xs',
            'focus:outline-primary-main focus:bg-primary-main/10',
            props.endIcon ? 'pr-9' : '',
            errorMessage ? 'outline-red-500 bg-red-100' : '',
          )}
          id={props.id}
        />
        {props.endIcon && <span className="absolute right-3 flex items-center">{props.endIcon}</span>}
      </div>
      {(errorMessage || props.helperText) && (
        <p className={twMerge('text-xs mt-1', errorMessage ? 'text-red-500' : 'text-gray-500')}>
          {errorMessage || props.helperText}
        </p>
      )}
    </div>
  );
}

interface IProps {
  id: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onEnter?: () => void;
  errorMessage?: any;
  helperText?: string;
  name: string;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
}