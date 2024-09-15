import './ObjectLayout.scss';

import { FC, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

import { api } from '@/api';
import Loader from '@/components/Loader/Loader';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { Rig } from '@/models/Rig';
import { useToastStore } from '@/store/useToastStore';
import { useQuery } from '@tanstack/react-query';

interface ObjectLayoutProps {}

const ObjectLayout: FC<ObjectLayoutProps> = () => {
  const { id } = useParams();
  const toastStore = useToastStore();

  const {
    data: rigQuery,
    isLoading: rigIsLoading,
    isSuccess: rigIsSuccess,
  } = useQuery({
    queryKey: ['objects', 'get', 'id', id],
    queryFn: () => api.getById<Rig>('rigs', Number(id)),
  });

  useEffect(() => {
    if (rigIsSuccess) {
      toastStore.addToast(
        'info',
        `До конца бурения осталось ${Number(rigQuery?.well_depth) - Number(rigQuery?.bottom_hole_drilling)} м.`,
      );
    }
  }, [rigIsSuccess]);

  let progressBarColor = 'var(--text-additional-color)';

  if (rigQuery?.drilling_status_id === 1) {
    progressBarColor = 'var(--success-color)';
  } else if (rigQuery?.drilling_status_id === 2) {
    progressBarColor = 'var(--warning-color)';
  } else if (rigQuery?.drilling_status_id === 3) {
    progressBarColor = 'var(--error-color)';
  } else if (rigQuery?.drilling_status_id === 4) {
    progressBarColor = 'var(--text-additional-color)';
  }

  if (rigIsLoading) return <Loader />;

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
              Горная порода: <b>Песчаник</b>
            </span>
            <span>
              Текущий процесс: <b>Бурение</b>
            </span>
          </div>

          <hr />

          <div>
            <span>
              Текущая глубина: <b>{rigQuery?.bottom_hole_drilling} м</b>
            </span>
            <span>
              Осталось:{' '}
              <b>
                {Number(rigQuery?.well_depth) -
                  Number(rigQuery?.bottom_hole_drilling)}{' '}
                м
              </b>
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
                  ((rigQuery?.bottom_hole_drilling ?? 0) /
                    (rigQuery?.well_depth ?? 1)) *
                  100
                ).toFixed(1)}
                %
              </b>
            </span>
            <div style={{ flex: 1 }}>
              <ProgressBar
                loader={rigQuery?.drilling_status_id === 1}
                value={
                  ((rigQuery?.bottom_hole_drilling ?? 0) /
                    (rigQuery?.well_depth ?? 1)) *
                  100
                }
                color={progressBarColor}
                max={100}
              />
            </div>
          </div>
        </div>
      </div>

      <Outlet context={{ rigQuery }} />
    </div>
  );
};

export default ObjectLayout;
