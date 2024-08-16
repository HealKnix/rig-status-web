import './Button.scss';

import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'light' | 'black' | 'red' | 'white' | 'outlined';
}

const Button: FC<ButtonProps> = ({ variant = 'accent', ...props }) => {
  return (
    <button
      className={variant + (props.className ? ` ${props.className}` : '')}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
