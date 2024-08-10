import './ObjectLayout.scss';

import { FC, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';

interface ObjectLayoutProps {}

const ObjectLayout: FC<ObjectLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.key === 'default') {
      navigate('workplace');
    }
  });

  return (
    <div className="object-layout__wrapper">
      <div className="object-header">
        <Link to="/console" className="object-header__btn-back">
          <ChevronSVG />
          <span
            style={{
              color: 'var(--white)',
            }}
          >
            Объекты
          </span>
        </Link>

        <div className="object-header__content">
          <div>
            <span>
              Дата начала <b>03.06.2024</b>
            </span>
            <span>
              Дата окончания <b>03.06.2024</b>
            </span>
          </div>

          <hr />

          <div>
            <span>
              Тип скважины: <b>ГС</b>
            </span>
            <span>
              № скважины: <b>XXXX</b>
            </span>
          </div>

          <hr />

          <div>
            <span>
              Прогресс:{' '}
              <b
                style={{
                  fontSize: '20px',
                }}
              >
                70%
              </b>
            </span>
            <ProgressBar
              color="var(--success-color)"
              value={70}
              maxValue={100}
              loader
            />
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default ObjectLayout;
