import { FC, useEffect, useRef } from 'react';

import FocusTrap from '../FocusTrap/FocusTrap';
import styles from './Dropdown.module.scss';

interface DropdownProps {
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
  target: React.ReactElement | React.ReactElement[] | string | string[];
  children: React.ReactElement | React.ReactElement[] | string | string[];
}

const Dropdown: FC<DropdownProps> = ({ placement = '', target, children }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdownMenuEl = dropdownRef.current?.children.item(1);

    const handleClick = () => {
      dropdownMenuEl?.classList.toggle(styles.show);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const someElement = e.target as HTMLElement;

      if (!dropdownRef.current?.contains(someElement)) {
        dropdownMenuEl?.classList.remove(styles.show);
      }
    };

    dropdownRef.current?.addEventListener('click', handleClick);
    window.addEventListener('click', handleClickOutside);

    return () => {
      dropdownRef.current?.removeEventListener('click', handleClick);
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {target}
      <FocusTrap>
        <div className={`${styles['dropdown-menu']} ${styles[placement]}`}>
          {children}
        </div>
      </FocusTrap>
    </div>
  );
};

export default Dropdown;
