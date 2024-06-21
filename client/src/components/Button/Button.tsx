import './Button.scss';

import { FC } from 'react';

interface ButtonProps {
  variant?: 'accent' | 'light' | 'black' | 'red' | 'white' | 'outlined';
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
  style?: React.CSSProperties;

  forwardRef?: React.Ref<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLButtonElement> | undefined;
  onSubmit?: React.FormEventHandler<HTMLButtonElement> | undefined;
}

const Button: FC<ButtonProps> = ({
  variant = 'accent',
  className,
  children,
  style,
  forwardRef,
  onClick,
  onChange,
  onSubmit,
}) => {
  return (
    <button
      className={variant + (className ? ` ${className}` : '')}
      ref={forwardRef}
      onClick={onClick}
      onChange={onChange ?? (() => {})}
      onSubmit={onSubmit}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
