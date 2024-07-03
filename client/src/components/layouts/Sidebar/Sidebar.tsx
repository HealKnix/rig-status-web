import './Sidebar.scss';

import { NavLink } from 'react-router-dom';

import ChevronSVG from '@/components/SVGs/ChevronSVG';
import RigSVG from '@/components/SVGs/RigSVG';
import ScreensSVG from '@/components/SVGs/ScreensSVG';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <div id="main-logo"></div>
      </div>
      <div className="sidebar__navs">
        <ul>
          <li>
            <NavLink to="/machine-vision">
              <span>
                <ScreensSVG />
                Машинное зрение
              </span>
              <ChevronSVG />
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/objects">
              <span>
                <RigSVG />
                Объекты
              </span>
              <ChevronSVG />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
