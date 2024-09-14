import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import FocusTrap from '../FocusTrap/FocusTrap';
import styles from './DropdownMenu.module.scss';

interface DropdownMenuProps {
  placement?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomRight'
    | 'bottom'
    | 'bottomLeft'
    | 'leftBottom'
    | 'left'
    | 'leftTop';
  delay?: number;
  target: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

const DropdownMenu: FC<DropdownMenuProps> = ({
  placement = 'right',
  delay = 150,
  target,
  children,
}) => {
  const [show, setShow] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [showStyle, setShowStyle] = useState('');

  const closeDropdownModal = () => {
    setShowStyle('');
    setTimeout(() => {
      setShow(false);
    }, delay);
  };

  const toggleDropdownModal = () => {
    if (!show) {
      setShow(true);
      setTimeout(() => {
        setShowStyle(styles.show);
      }, 0);
    }
    if (show) {
      setShowStyle('');
      setTimeout(() => {
        setShow(false);
      }, delay);
    }
  };

  useEffect(() => {
    const dropdownMenuTargetEl = dropdownMenuRef.current?.children.item(
      0,
    ) as HTMLElement;
    const dropdownMenuContentEl = dropdownMenuRef.current?.children.item(
      1,
    ) as HTMLElement;

    const handleClick = () => {
      if (dropdownMenuTargetEl.tagName === 'BUTTON') {
        if (dropdownMenuRef.current?.classList.contains(styles.active)) {
          dropdownMenuRef.current?.classList.remove(styles.active);
          closeDropdownModal();
          return;
        }
        dropdownMenuRef.current?.classList.toggle(styles.active);
      }
      toggleDropdownModal();
    };

    const handleClickClose = (e: MouseEvent) => {
      if ((e.currentTarget as HTMLElement).tagName === 'BUTTON') {
        (e.currentTarget as HTMLElement).setAttribute('disabled', '');
        dropdownMenuRef.current?.classList.remove(styles.active);
        closeDropdownModal();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const someElement = e.target as HTMLElement;

      if (!dropdownMenuRef.current?.contains(someElement)) {
        dropdownMenuRef.current?.classList.remove(styles.active);
        closeDropdownModal();
      }
    };

    dropdownMenuTargetEl?.addEventListener('click', handleClick);
    dropdownMenuContentEl?.childNodes.forEach((child) => {
      (child as HTMLElement).addEventListener('click', handleClickClose);
    });
    window.addEventListener('click', handleClickOutside);

    return () => {
      dropdownMenuTargetEl?.removeEventListener('click', handleClick);
      dropdownMenuContentEl?.childNodes.forEach((child) => {
        (child as HTMLElement).removeEventListener('click', handleClickClose);
      });
      window.removeEventListener('click', handleClickOutside);
    };
  }, [show]);

  return (
    <div className={styles['dropdown-menu']} ref={dropdownMenuRef}>
      {target}
      {show && (
        <FocusTrap>
          <div
            style={
              {
                '--dropdownMenuDelay': `${delay}ms`,
              } as React.CSSProperties
            }
            className={`${styles['dropdown-menu__content']} ${showStyle} ${styles[placement]}`}
          >
            {children}
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default DropdownMenu;
