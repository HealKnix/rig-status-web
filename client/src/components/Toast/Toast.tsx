import './Toast.scss';

import { createPortal } from 'react-dom';

import { useToastStore } from '@/store/useToastStore';

import DocumentInfoSVG from '../SVGs/DocumentInfoSVG';
import ErrorSVG from '../SVGs/ErrorSVG';
import SuccessSVG from '../SVGs/SuccessSVG';
import WarningSVG from '../SVGs/WarningSVG';

const animationDuration = 150;
const progressDuration = 5000;

const Toast = () => {
  const toastStore = useToastStore();

  return createPortal(
    !!toastStore.toasts.length && (
      <div className="toast__wrapper">
        {toastStore.toasts.map((toast) => (
          <div
            aria-hidden="true"
            className={`toast ${toast.variant}`}
            style={
              {
                '--toastDuration': `${animationDuration / 1000}s`,
                '--toastProgressDuration': `${progressDuration / 1000}s`,
              } as React.CSSProperties
            }
            key={toast.id}
            onClick={(e) => {
              const toastProgressElement = e.currentTarget.children[2];
              toastProgressElement.classList.add('end');
              setTimeout(() => {
                toastStore.delToast(toast.id);
              }, animationDuration);
            }}
          >
            <div className="toast-left">
              {toast.variant === 'success' && <SuccessSVG />}
              {toast.variant === 'warning' && <WarningSVG />}
              {toast.variant === 'error' && <ErrorSVG />}
              {toast.variant === 'info' && <DocumentInfoSVG />}
            </div>
            <div className="toast-right">
              <div className="toast-type-title">
                {toast.variant === 'success' && 'Успешно'}
                {toast.variant === 'warning' && 'Предупреждение'}
                {toast.variant === 'error' && 'Ошибка'}
                {toast.variant === 'info' && 'Информация'}
              </div>
              <div className="toast-description">{toast.description}</div>
            </div>
            <div
              className="toast-progress"
              onAnimationEnd={(e) => {
                e.currentTarget.classList.add('end');
                setTimeout(() => {
                  toastStore.delToast(toast.id);
                }, animationDuration);
              }}
            ></div>
          </div>
        ))}
      </div>
    ),
    document.getElementById('toast')!,
  );
};

export default Toast;
