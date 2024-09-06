import './ObjectScreens.scss';

import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CrossSVG from '@/assets/cross.svg';
import Image1 from '@/assets/mock-images/img_1.png';
import Image2 from '@/assets/mock-images/img_2.png';
import Image3 from '@/assets/mock-images/img_3.png';
import Button from '@/components/Button/Button';
import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectScreensProps {}

const ObjectScreens: FC<ObjectScreensProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  const [currentScreenTarget, setCurrentScreenTarget] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  const handleClickMaximizeScreen = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const target = e.currentTarget as HTMLDivElement;

    if (!currentScreenTarget) {
      setCurrentScreenTarget(() => {
        if (!target.classList.contains('full-screen')) {
          target.classList.add('full-screen');
        }
        return target;
      });
    }
  };

  const handleClickMinimizeScreen = () => {
    setCurrentScreenTarget((pv) => {
      pv?.classList.remove('full-screen');
      return null;
    });
  };

  return (
    <div className="object-screens__wrapper">
      div
        className="object-screens__block"
        onClick={handleClickMaximizeScreen}
      >
        <div style={{ padding: '15px', flex: 'none' }}>
          <h2>
            Общий вид
            {currentScreenTarget && (
              <Button
                style={{
                  width: 'fit-content',
                }}
                variant="transparent"
                onClick={handleClickMinimizeScreen}
              >
                <img src={CrossSVG} alt="cross" width={16} />
              </Button>
            )}
          </h2>
        </div>
        <div>
          <img src={Image3} alt="" />
        </div>
      </div>

      <div
        className="object-screens__block"
        onClick={handleClickMaximizeScreen}
      >
        <div style={{ padding: '15px', flex: 'none' }}>
          <h2>
            Буровая вид спереди
            {currentScreenTarget && (
              <Button
                style={{
                  width: 'fit-content',
                }}
                variant="transparent"
                onClick={handleClickMinimizeScreen}
              >
                <img src={CrossSVG} alt="cross" width={16} />
              </Button>
            )}
          </h2>
        </div>
        <div
          style={{
            overflow: 'hidden',
          }}
        >
          <img src={Image1} alt="" />
        </div>
      </div>

      <div
        className="object-screens__block"
        onClick={handleClickMaximizeScreen}
      >
        <div style={{ padding: '15px', flex: 'none' }}>
          <h2>
            Контроль талевой системы
            {currentScreenTarget && (
              <Button
                style={{
                  width: 'fit-content',
                }}
                variant="transparent"
                onClick={handleClickMinimizeScreen}
              >
                <img src={CrossSVG} alt="cross" width={16} />
              </Button>
            )}
          </h2>
        </div>
        <div>
          <img src={Image2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ObjectScreens;
