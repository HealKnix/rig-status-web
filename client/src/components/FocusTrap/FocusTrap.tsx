import { cloneElement, FC } from 'react';

interface FocusTrapProps {
  children: React.ReactElement;
}

const FocusTrap: FC<FocusTrapProps> = ({ children }) => {
  const handleKey = (e: KeyboardEvent) => {
    const element = e.currentTarget as HTMLElement;

    if (e.key === 'Tab') {
      const focusable = element.querySelectorAll(
        'input,button,select,textarea,a,[tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length) {
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        const shift = e.shiftKey;
        if (shift) {
          if (e.target === first) {
            last.focus();
            e.preventDefault();
          }
        } else if (e.target === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  };

  const enhancedChildren = cloneElement(children, {
    onKeyDown: handleKey,
  });

  return <>{enhancedChildren}</>;
};

export default FocusTrap;
