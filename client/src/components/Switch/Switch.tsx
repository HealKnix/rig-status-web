import './Switch.scss';

import { FC, InputHTMLAttributes } from 'react';

// interface SwitchProps {}

const Switch: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input type="checkbox" className="custom-checkbox" {...props} />;
};

export default Switch;
