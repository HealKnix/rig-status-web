import './Alert.scss';

import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Button from '@/components/Button/Button';
import WarningSVG from '@/components/SVGs/WarningSVG';
import { useAlertStore } from '@/store/useAlertStore';

interface AlertProps {}

const Alert: FC<AlertProps> = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const alertStore = useAlertStore();

  useEffect(() => {
    if (alertStore.alert) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [alertStore.alert]);

  return createPortal(
    <dialog id="dialog-alert" ref={dialogRef} tabIndex={-1}>
      <div className="alert-content">
        <div className="alert-header">
          <WarningSVG width={50} height={50} pathColor="var(--white)" />
          <span className="alert-title">Внимание</span>
        </div>
        <span className="alert-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          ultrices elit ac lorem facilisis semper.
        </span>
        <Button
          variant="transparent"
          onClick={() => {
            alertStore.closeAlert();
          }}
        >
          Ок
        </Button>
      </div>
    </dialog>,
    document.getElementById('alert')!,
  );
};

export default Alert;
