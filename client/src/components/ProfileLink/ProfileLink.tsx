import './ProfileLink.scss';

import { FC } from 'react';

import { useAuthStore } from '@/store/useAuthStore';
import { useModalStore } from '@/store/useModalStore';

import ChevronSVG from '../SVGs/ChevronSVG';

interface ProfileLinkProps {}

const ProfileLink: FC<ProfileLinkProps> = () => {
  const authStore = useAuthStore();
  const modalStore = useModalStore();

  return (
    <div
      className="profile-link"
      onClick={() => {
        modalStore.openLogoutModal();
      }}
    >
      <div className="profile-link__wrapper">
        <div className="profile-image"></div>
        <div className="profile-text">
          <div className="profile-text__short-name">
            {`${authStore.user?.last_name} ${authStore.user?.first_name?.[0]}.  ${authStore.user?.middle_name?.[0]}.`}
          </div>
        </div>
      </div>
      <ChevronSVG />
    </div>
  );
};

export default ProfileLink;
