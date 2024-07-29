import './Input.scss';

import { FC, InputHTMLAttributes, useEffect, useState } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  movable_placeholder: boolean | undefined;
  forward_ref?: React.Ref<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  movable_placeholder,
  forward_ref,
  ...props
}) => {
  const [movableTitle, setMovableTitle] = useState(false);

  useEffect(() => {
    if (movable_placeholder) {
      if (props.value) setMovableTitle(true);
      else setMovableTitle(false);
    }
  }, [props.value, movableTitle, movable_placeholder]);

  return (
    <>
      <label htmlFor={props.id} className="input__wrapper">
        {props.title && (
          <span
            className={
              movable_placeholder
                ? `input-title--movable-placeholder ${
                    movableTitle ? 'input-title--movable' : ''
                  }`
                : 'input-title'
            }
          >
            {props.title}
          </span>
        )}
        <input
          className="input"
          placeholder={movable_placeholder ? '' : props.placeholder}
          ref={forward_ref}
          {...props}
        />
      </label>
    </>
  );
};

export default Input;
