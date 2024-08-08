import './ObjectScreens.scss';

import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Image1 from '@/assets/mock-images/img_1.png';
import Image2 from '@/assets/mock-images/img_2.png';
import Image3 from '@/assets/mock-images/img_3.png';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectScreensProps {}

const ObjectScreens: FC<ObjectScreensProps> = (props) => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return (
    <div className="object-screens__wrapper">
      <div className="object-screens__header">
        <Link to="/console" className="object-screens__bento_back_btn">
          <ChevronSVG />
        </Link>
        <div className="bento-object-selector">
          <span>Экраны</span>
        </div>
      </div>

      <div className="row">
        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 1
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <img src={Image1} width={'fit-content'} />
          </div>
        </div>

        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 2
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <img src={Image2} width={'fit-content'} />
          </div>
        </div>

        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 3
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <img src={Image3} width={'fit-content'} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 4
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <span className="error-table">Ошибка</span>
          </div>
        </div>

        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 5
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <span className="error-table">Ошибка</span>
          </div>
        </div>

        <div className="bento">
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Экран 6
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <span className="error-table">Ошибка</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectScreens;
