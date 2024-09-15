import EChartsReact from 'echarts-for-react';
import { FC } from 'react';

interface SpeedometerProps {
  color: string;
  textColor?: string;
  size: number;
  value: number;
  unite: string;
  min: number;
  max: number;
}

const Speedometer: FC<SpeedometerProps> = ({
  color,
  textColor = '#1b2539',
  size,
  value,
  unite = '',
  min,
  max,
}) => {
  const options: echarts.EChartsOption = {
    series: [
      {
        type: 'gauge',
        itemStyle: {
          color: color,
        },
        radius: size / 2,
        progress: {
          show: true,
          width: 8,
        },
        axisLine: {
          lineStyle: {
            width: 8,
          },
        },
        pointer: {
          show: true,
          width: 2,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 2,
          itemStyle: {
            borderColor: color,
            borderWidth: 4,
          },
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 16,
          lineHeight: 16,
          fontFamily: 'Geometria',
          offsetCenter: [0, 35],
          fontWeight: 'bolder',
          formatter: `{value}\n${unite}`,
          color: textColor,
        },
        min: min,
        max: max,
        data: [
          {
            value: value,
          },
        ],
      },
    ],
  };

  return (
    <EChartsReact
      option={options}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default Speedometer;
