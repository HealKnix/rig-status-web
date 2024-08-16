import './RadioForm.scss';

import { FC } from 'react';

export interface RadioFormValue {
  name: string;
  value: string | number | readonly string[] | undefined;
}

interface RadioFormProps {
  idName: string;
  title: string;
  values: readonly RadioFormValue[];
  value: string | number | readonly string[] | undefined;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioForm: FC<RadioFormProps> = ({
  idName,
  title,
  values,
  value,
  onChange,
}) => {
  return (
    <div className="input-radio-form__wrapper">
      <span className="input-radio-form-title">{title}</span>
      <div className="input-radio__wrapper">
        {values.map((v, index) => (
          <label
            htmlFor={`${idName}-${index}`}
            key={index}
            className="label-input-radio"
          >
            <span>{v.name}</span>
            <input
              type="radio"
              className="input-radio"
              id={`${idName}-${index}`}
              value={v.value}
              tabIndex={v.value === value ? 0 : -1}
              checked={v.value === value}
              onChange={onChange ?? (() => {})}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioForm;
