import './Sidebar.scss';

import { NavLink } from 'react-router-dom';

import ChevronSVG from '@/components/SVGs/ChevronSVG';
import ConsoleSVG from '@/components/SVGs/ConsoleSVG';
import LineChartSVG from '@/components/SVGs/LineChartSVG';
import RigSVG from '@/components/SVGs/RigSVG';
import ScreensSVG from '@/components/SVGs/ScreensSVG';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src="/logo.svg" alt="Логотип" height="60" />
      </div>
      <div className="sidebar__navs">
        <ul>
          <li>
            <NavLink to="/console">
              <span>
                <ConsoleSVG />
                Консоль
              </span>
              <ChevronSVG />
            </NavLink>
          </li>
          <li>
            <NavLink to="/screens">
              <span>
                <ScreensSVG />
                Экраны
              </span>
              <ChevronSVG />
            </NavLink>
          </li>
          <li>
            <NavLink to="/signals">
              <span>
                <LineChartSVG />
                Сигналы
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
