import './ProfileLink.scss';

import { FC } from 'react';

import { useAuthStore } from '@/store/useAuthStore';

import ChevronSVG from '../SVGs/ChevronSVG';
import UserSVG from '../SVGs/UserSVG';

interface ProfileLinkProps {}

const ProfileLink: FC<ProfileLinkProps> = () => {
  const authStore = useAuthStore();

  return (
    <div className="profile-link">
      <div className="profile-link__wrapper">
        <UserSVG />
        <div className="profile-text">
          <div className="profile-text__short-name">
            {`${authStore.user?.last_name} ${authStore.user?.first_name?.[0]}.  ${authStore.user?.patronymic?.[0]}.`}
          </div>
        </div>
      </div>
      <ChevronSVG />
    </div>
  );
};

export default ProfileLink;
