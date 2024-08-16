import './ObjectLayout.scss';

import { FC, useEffect } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { api } from '@/api';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { Rig } from '@/models/Rig';
import { useQuery } from '@tanstack/react-query';

interface ObjectLayoutProps {}

const ObjectLayout: FC<ObjectLayoutProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { data: rig, isFetching } = useQuery({
    queryKey: ['workplace rig id'],
    queryFn: () => api.getById<Rig>('rigs', Number(id)),
  });

  useEffect(() => {
    if (location.key === 'default') {
      navigate('workplace');
    }
  }, []);

  let progressBarColor = 'var(--text-additional-color)';

  if (rig?.drilling_status_id === 1) {
    progressBarColor = 'var(--success-color)';
  } else if (rig?.drilling_status_id === 2) {
    progressBarColor = 'var(--warning-color)';
  } else if (rig?.drilling_status_id === 3) {
    progressBarColor = 'var(--error-color)';
  } else if (rig?.drilling_status_id === 4) {
    progressBarColor = 'var(--text-additional-color)';
  }

  return (
    <div className="object-layout__wrapper">
      {!isFetching && (
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
              <span
                style={{
                  textWrap: 'nowrap',
                }}
              >
                Дата начала <b>03.06.2024</b>
              </span>
              <span
                style={{
                  textWrap: 'nowrap',
                }}
              >
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
                  {(
                    ((rig?.bottom_hole_drilling ?? 0) /
                      (rig?.well_depth ?? 1)) *
                    100
                  ).toFixed(1)}
                  %
                </b>
              </span>
              <ProgressBar
                loader={rig?.drilling_status_id === 1}
                value={
                  ((rig?.bottom_hole_drilling ?? 0) / (rig?.well_depth ?? 1)) *
                  100
                }
                color={progressBarColor}
                max={100}
                style={{
                  flex: '1',
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default ObjectLayout;
