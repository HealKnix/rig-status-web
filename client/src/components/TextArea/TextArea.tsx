import './TextArea.scss';

import { FC, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  title?: string;
}

const TextArea: FC<TextAreaProps> = ({ id, title, ...props }) => {
  return (
    <label htmlFor={id} className="custom-textarea__wrapper">
      {title}
      <textarea id={id} className="custom-textarea" {...props} />
    </label>
  );
};

export default TextArea;
