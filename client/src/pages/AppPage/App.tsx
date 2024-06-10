import './App.scss';

import { Link } from 'react-router-dom';

export default function App() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-logo"></div>
        <div className="sidebar-navs">
          <ul>
            <li>
              <Link to={'/console'}>Консоль</Link>
            </li>
            <li>
              <Link to={'/screens'}>Экраны</Link>
            </li>
            <li>
              <Link to={'/signals'}>Сигналы</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to={'/objects'}>Объекты</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="content__wrapper">
        <header></header>
        <main></main>
      </div>
    </>
  );
}
