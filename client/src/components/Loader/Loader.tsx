import './Loader.scss';

import { FC } from 'react';

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className="loader">
      <div className="loader__item_wrapper">
        <div className="loader__item"></div>
        <div className="loader__item"></div>
        <div className="loader__item"></div>
      </div>
    </div>
  );
};

export default Loader;
