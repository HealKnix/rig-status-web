import './Objects.scss';

import { Link } from 'react-router-dom';

import ObjectCard from '@/components/ObjectCard/ObjectCard';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { rigList } from '@/models/mock/rig';

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
          {rigList.map((rig) => (
            <ObjectCard {...rig} />
          ))}
        </div>
      </div>
    </>
  );
}
