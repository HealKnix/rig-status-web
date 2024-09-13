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
  target: ReactNode | ReactNode[];
  children: ReactNode | ReactNode[];
}

const DELAY = 25;

const DropdownMenu: FC<DropdownMenuProps> = ({
  placement = 'right',
  target,
  children,
}) => {
  const [show, setShow] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdownMenuTargetEl = dropdownMenuRef.current?.children.item(
      0,
    ) as HTMLElement;
    const dropdownMenuContentEl = dropdownMenuRef.current?.children.item(
      1,
    ) as HTMLElement;

    const closeDropdownModal = () => {
      setTimeout(() => {
        setShow(false);
      }, DELAY);
    };

    const toggleDropdownModal = () => {
      setTimeout(() => {
        setShow((pv) => !pv);
      }, DELAY);
    };

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
    <div className={`${styles['dropdown-menu']}`} ref={dropdownMenuRef}>
      {target}
      {show && (
        <FocusTrap>
          <div
            className={`${styles['dropdown-menu__content']} ${show && styles.show} ${styles[placement]}`}
          >
            {children}
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default DropdownMenu;
