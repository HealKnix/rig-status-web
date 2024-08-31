import './Button.scss';

import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'primary-light'
    | 'black'
    | 'red'
    | 'green'
    | 'transparent';
  outlined?: boolean;
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  outlined = false,
  ...props
}) => {
  return (
    <button
      className={`custom-btn ${outlined ? 'outlined' : ''} ${variant} ${props.className ? props.className : ''}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
