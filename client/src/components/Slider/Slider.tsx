import './Slider.scss';

import { FC, InputHTMLAttributes } from 'react';

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Slider: FC<SliderProps> = ({ title, ...props }) => {
  return (
    <label htmlFor="custom-slider" className="custom-slider__wrapper">
      <div>
        <span className="slider-title">{title}</span>
        <span className="slider-value">{props.value}</span>
      </div>
      <input type="range" className="custom-slider" {...props} />
    </label>
  );
};

export default Slider;
