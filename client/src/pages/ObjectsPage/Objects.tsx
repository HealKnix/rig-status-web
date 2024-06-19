import './Objects.scss';

import { Link } from 'react-router-dom';

import ObjectCard from '@/components/ObjectCard/ObjectCard';
import ChevronSVG from '@/components/SVGs/ChevronSVG';

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
          <ObjectCard
            id={1}
            name="Объект_1"
            location="59.02° 93.83°"
            connection_speed={150}
            drillingProgressValue={74}
            drillingProgressStatus="Работает"
            status="нормально"
          />
          <ObjectCard
            id={2}
            name="Объект_2"
            location="58.95° 95.72°"
            connection_speed={43}
            drillingProgressValue={74}
            drillingProgressStatus="Запуск..."
            status="удовлетворительно"
          />
          <ObjectCard
            id={3}
            name="Объект_3"
            location="58.64° 94.83°"
            connection_speed={1}
            drillingProgressValue={74}
            drillingProgressStatus="Авария"
            status="требуется ТО"
          />
          <ObjectCard
            id={4}
            name="Объект_4"
            location="58.64° 94.83°"
            connection_speed={0}
            drillingProgressValue={74}
            drillingProgressStatus="Отключено"
            status="не в сети"
          />
        </div>
      </div>
    </>
  );
}
