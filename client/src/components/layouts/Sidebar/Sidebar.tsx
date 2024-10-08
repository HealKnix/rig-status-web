import './Sidebar.scss';

import { Bell, HelpCircle, LogOut, Settings } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import UserManualPDF from '@/assets/Руководство_пользователя_RigStatus_v2.pdf';
import Button from '@/components/Button/Button';
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu';
import ProfileLink from '@/components/ProfileLink/ProfileLink';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import ConsoleSVG from '@/components/SVGs/ConsoleSVG';
import LineChartSVG from '@/components/SVGs/LineChartSVG';
import RigSVG from '@/components/SVGs/RigSVG';
import ScreensSVG from '@/components/SVGs/ScreensSVG';
import { useModalStore } from '@/store/useModalStore';
import { useObjectIdStore } from '@/store/useObjectIdStore';
import { useToastStore } from '@/store/useToastStore';

export default function Sidebar() {
  const location = useLocation();
  const objectIdStore = useObjectIdStore();
  const modalStore = useModalStore();
  const toastStore = useToastStore();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <NavLink id="main-logo" to={'/'}></NavLink>
      </div>

      <div className="sidebar__navs">
        <ul>
          <li>
            <Link
              to="/objects"
              className={location.pathname === '/objects' ? 'active' : ''}
            >
              <span>
                <RigSVG />
                <span>Объекты</span>
              </span>
              <ChevronSVG />
            </Link>
          </li>
        </ul>

        {objectIdStore.idIsNotNull() && (
          <ul>
            <li>
              <NavLink to={`/objects/${objectIdStore.id}/workplace`}>
                <span>
                  <ConsoleSVG />
                  <span>Рабочее место</span>
                </span>
                <ChevronSVG />
              </NavLink>
            </li>

            <li>
              <NavLink to={`/objects/${objectIdStore.id}/screens`}>
                <span>
                  <ScreensSVG />
                  <span>Экраны</span>
                </span>
                <ChevronSVG />
              </NavLink>
            </li>

            <li>
              <NavLink to={`/objects/${objectIdStore.id}/work-progress`}>
                <span>
                  <LineChartSVG />
                  <span>Прогресс работ</span>
                </span>
                <ChevronSVG />
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      <div className="sidebar__bottom">
        <DropdownMenu placement="rightBottom" target={<ProfileLink />}>
          <Button
            variant="transparent"
            onClick={() => {
              window.open(UserManualPDF);
            }}
          >
            <HelpCircle strokeWidth={1.5} />
            Помощь
          </Button>
          <Button
            variant="transparent"
            onClick={() => toastStore.addToast('info', 'В разработке...')}
          >
            <Bell strokeWidth={1.5} />
            Уведомления
          </Button>
          <Button
            variant="transparent"
            onClick={() => toastStore.addToast('info', 'В разработке...')}
          >
            <Settings strokeWidth={1.5} />
            Настройки
          </Button>
          <Button variant="red" outlined onClick={modalStore.openLogoutModal}>
            <LogOut strokeWidth={1.5} />
            Выход
          </Button>
        </DropdownMenu>
      </div>
    </div>
  );
}
