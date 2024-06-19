import './Objects.scss';

import { Link } from 'react-router-dom';

import Button from '@/components/Button/Button';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import SatelliteSVG from '@/components/SVGs/SatelliteSVG';

export default function Objects() {
  return (
    <>
      <div className="objects__wrapper">
        <div className="objects__header row">
          <Link to="/console" className="bento_back_btn">
            <ChevronSVG />
          </Link>
          <div className="bento-object-selector">
            <label htmlFor="object-select">
              <span>Фильтрация по</span>
              <select name="objects" id="object-select">
                <option value="0">Углубка ствола</option>
                <option value="1">Объект_1</option>
                <option value="2">Объект_2</option>
              </select>
            </label>
          </div>
        </div>

        <div className="cards__wrapper">
          <div className="card-object">
            <span className="object-id">1</span>
            <span className="object-name">Объект_1</span>
            <span className="object-location">58.64° 94.83°</span>
            <div className="object-connection">
              <SatelliteSVG color="var(--success-color)" />
            </div>
            <div className="object-drilling-progress">
              <span>Работает</span>
              <progress
                className="progress-bar"
                max={100}
                defaultValue={0}
                value={74}
              ></progress>
            </div>
            <Button color="outlined">подробнее</Button>
            <span className="object-status">норм</span>
          </div>
        </div>
      </div>
    </>
  );
}
