import '../Modal.scss';
import './LogoutModal.scss';

import { FC } from 'react';

import { api } from '@/api';
import Button from '@/components/Button/Button';
import CrossSVG from '@/components/SVGs/CrossSVG';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';

interface LogoutModalProps {}

const LogoutModal: FC<LogoutModalProps> = () => {
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  if (!modalStore.logoutModal) return;

  return (
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-title">Выход</span>
        <div className="modal-header-btn">
          <Button
            style={{
              padding: 0,
              width: '40px',
              height: '40px',
            }}
            variant="transparent"
            onClick={() => modalStore.closeLogoutModal()}
          >
            <CrossSVG />
          </Button>
        </div>
      </div>
      <hr />
      <span className="modal-description">Вы точно хотите выйти?</span>
      <div className="modal-buttons">
        <Button
          variant="transparent"
          onClick={() => {
            modalStore.closeLogoutModal();
          }}
        >
          Нет
        </Button>
        <Button
          onClick={async () => {
            authStore.setUser(null);
            await api.logout();
            modalStore.closeLogoutModal();
          }}
        >
          Да
        </Button>
      </div>
    </div>
  );
};

export default LogoutModal;
