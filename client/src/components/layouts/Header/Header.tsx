import './Header.scss';

import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';

export default function Header() {
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  return (
    <header>
      <div className="header__user">
        <div
          className="user__wrapper"
          onClick={() => {
            modalStore.openProfileModal();
          }}
        >
          <div className="user-image"></div>
          <div className="user-text">
            <div className="user-text-short-name">
              {`${authStore.user?.lastName} ${authStore.user?.firstName?.[0]}.  ${authStore.user?.middleName?.[0]}.`}
            </div>
            <div className="user-text-role">{authStore.user?.role}</div>
          </div>
        </div>
        <ChevronSVG />
      </div>
    </header>
  );
}
