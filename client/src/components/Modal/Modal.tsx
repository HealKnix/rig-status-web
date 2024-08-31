import './Modal.scss';

import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useModalStore } from '@/store/useModalStore';

import FocusTrap from '../FocusTrap/FocusTrap';

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalStore = useModalStore();

  useEffect(() => {
    if (modalStore.modal) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [modalStore.modal]);

  useEffect(() => {
    const modal = dialogRef.current;

    const clickHandler = (e: MouseEvent) => {
      const dialogHTML = e.target as HTMLDialogElement;

      if (dialogHTML.id === 'dialog-modal') {
        e.preventDefault();
        modalStore.closeModal();
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        modalStore.closeModal();
      }
    };

    modal?.addEventListener('mouseup', clickHandler);
    modal?.addEventListener('keydown', keyDownHandler);

    return () => {
      modal?.removeEventListener('mouseup', clickHandler);
      modal?.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return createPortal(
    <FocusTrap>
      <dialog id="dialog-modal" ref={dialogRef} tabIndex={-1}>
        {children}
      </dialog>
    </FocusTrap>,
    document.getElementById('modal')!,
  );
};

export default Modal;
