import './Sidebar.scss';

import { Link, NavLink, useLocation } from 'react-router-dom';

import ProfileLink from '@/components/ProfileLink/ProfileLink';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import ConsoleSVG from '@/components/SVGs/ConsoleSVG';
import LineChartSVG from '@/components/SVGs/LineChartSVG';
import RigSVG from '@/components/SVGs/RigSVG';
import RobotSVG from '@/components/SVGs/RobotSVG';
import ScreensSVG from '@/components/SVGs/ScreensSVG';
import { useObjectIdStore } from '@/store/useObjectIdStore';

export default function Sidebar() {
  const location = useLocation();
  const objectIdStore = useObjectIdStore();

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
              <NavLink to={`/objects/${objectIdStore.id}/robot`}>
                <span>
                  <RobotSVG />
                  <span>Робот</span>
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
        <ProfileLink />
      </div>
    </div>
  );
}
