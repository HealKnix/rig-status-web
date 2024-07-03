import './MachineVision.scss';

import { Link } from 'react-router-dom';

import Image1 from '@/assets/mock-images/img_1.png';
import Image2 from '@/assets/mock-images/img_2.png';
import Image3 from '@/assets/mock-images/img_3.png';
import ChevronSVG from '@/components/SVGs/ChevronSVG';

export default function MachineVision() {
  return (
    <>
      <div className="machine-vision__wrapper">
        <div className="machine-vision__header row">
          <Link to="/console" className="bento_back_btn">
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
              Экран 1 (Объект 1)
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
              Экран 2 (Объект 1)
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
              Экран 1 (Объект 2)
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
              Экран 2 (Объект 2)
            </h2>
            <hr />
            <div
              style={{
                width: '100%',
              }}
            >
              <span className="error-table">Error</span>
            </div>
          </div>

          <div className="bento">
            <h2
              style={{
                color: 'var(--text-additional-color)',
              }}
            >
              Экран 1 (Объект 3)
            </h2>
            <hr />
            <div
              style={{
                width: '100%',
              }}
            >
              <span className="error-table">Error</span>
            </div>
          </div>

          <div className="bento">
            <h2
              style={{
                color: 'var(--text-additional-color)',
              }}
            >
              Экран 2 (Объект 3)
            </h2>
            <hr />
            <div
              style={{
                width: '100%',
              }}
            >
              <span className="error-table">Error</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
