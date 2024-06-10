import './Input.scss';

import { FC, HTMLInputAutoCompleteAttribute } from 'react';

interface ButtonProps {
  id?: string;
  title?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'button' | 'submit' | 'reset';
  required?: boolean;
  value?: string | number;
  movablePlaceholder?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;

  forwardRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: React.FormEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

const Input: FC<ButtonProps> = ({
  id,
  placeholder,
  title,
  type,
  required,
  value,
  movablePlaceholder,
  autoComplete,
  forwardRef,
  onChange,
  onSubmit,
  onKeyDown,
}) => {
  return (
    <>
      <label htmlFor={id} className="input__wrapper">
        {title && (
          <span
            className={
              movablePlaceholder
                ? 'input-title--movable-placeholder'
                : 'input-title'
            }
          >
            {title}
          </span>
        )}
        <input
          id={id}
          className="input"
          autoComplete={autoComplete}
          type={type}
          value={value}
          required={required}
          placeholder={movablePlaceholder ? '' : placeholder}
          ref={forwardRef}
          onChange={onChange ?? (() => {})}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
        />
      </label>
    </>
  );
};

export default Input;
