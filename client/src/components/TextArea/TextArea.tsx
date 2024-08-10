import './TextArea.scss';

import { FC } from 'react';

interface ButtonProps {
  id: string;
  title?: string;
  value: string | number;

  forwardRef?: React.Ref<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  onSubmit?: React.FormEventHandler<HTMLTextAreaElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

const TextArea: FC<ButtonProps> = ({
  id,
  title,
  value,
  onChange,
  onKeyDown,
  forwardRef,
}) => {
  return (
    <label htmlFor={id} className="custom-textarea__wrapper">
      {title}
      <textarea
        id={id}
        className="custom-textarea"
        value={value}
        ref={forwardRef}
        onChange={onChange ?? (() => {})}
        onKeyDown={onKeyDown}
      />
    </label>
  );
};

export default TextArea;
