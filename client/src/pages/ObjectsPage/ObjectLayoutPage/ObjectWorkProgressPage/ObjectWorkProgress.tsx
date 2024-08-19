import './ObjectWorkProgress.scss';

import EChartsReact from 'echarts-for-react';
import { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { Rig } from '@/models/Rig';
import { useObjectIdStore } from '@/store/useObjectIdStore';

export default function ObjectWorkProgress() {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  const { rig } = useOutletContext<{ rig: Rig }>();

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  const options: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {},
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    grid: {
      left: '15px',
      right: '15px',
      top: '45px',
      bottom: '50px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      inverse: true,
    },
    dataZoom: [
      {
        type: 'inside',
        start: -Infinity,
        end: Infinity,
      },
      {
        start: -Infinity,
        end: Infinity,
      },
    ],
    series: [
      {
        name: 'Положение долота',
        type: 'line',
        smooth: true,
        data: [
          [1, 102.49],
          [2, 102.49],
          [3, 123.53],
          [4, 123.53],
          [5, 123.53],
          [6, 305.99],
          [7, 305.99],
          [8, 305.99],
          [9, 636.81],
          [10, 636.81],
          [11, 636.81],
          [12, 943.86],
          [13, 943.86],
          [14, 943.86],
          [15, 943.86],
          [16, 1402.18],
          [17, 1402.18],
          [18, 1402.18],
          [19, 1402.18],
          [20, 1971.36],
          [21, 1971.36],
          [22, 1971.36],
          [23, 1971.36],
          [24, 1971.36],
          [25, 1971.36],
          [26, 2200.21],
          [27, 2200.21],
          [28, 2200.21],
          [29, 2302.28],
          [30, 2302.28],
          [31, 2302.28],
          [32, 2302.28],
          [33, 2302.28],
          [34, 2302.28],
          [35, 2302.28],
          [36, 2302.28],
          [37, 2302.28],
        ],
        color: '#00C472',
      },
      {
        name: 'Факт',
        type: 'line',
        smooth: true,
        data: [
          [1, 592.49],
          [2, 592.49],
          [3, 593.53],
          [4, 593.53],
          [5, 593.53],
          [6, 705.99],
          [7, 705.99],
          [8, 705.99],
          [9, 1036.81],
          [10, 1036.81],
          [11, 1036.81],
          [12, 1343.86],
          [13, 1343.86],
          [14, 1343.86],
          [15, 1343.86],
          [16, 1802.18],
          [17, 1802.18],
          [18, 1802.18],
          [19, 1802.18],
          [20, 2371.35],
          [21, 2371.35],
          [22, 2371.35],
          [23, 2371.35],
          [24, 2371.35],
          [25, 2371.35],
          [26, 2600.21],
          [27, 2600.21],
          [28, 2600.21],
          [29, 2702.28],
          [30, 2702.28],
          [31, 2702.28],
          [32, 2702.28],
          [33, 2702.28],
          [34, 2702.28],
          [35, 2702.28],
          [36, 2702.28],
          [37, 2702.28],
        ],
        color: '#FF7C3A',
      },
      {
        name: 'План',
        type: 'line',
        smooth: true,
        data: [
          [1, 502.5],
          [2, 502.5],
          [3, 502.5],
          [4, 502.5],
          [5, 502.5],
          [6, 963.8],
          [7, 963.8],
          [8, 963.8],
          [9, 1135.6],
          [10, 1135.6],
          [11, 1135.6],
          [12, 1448.7],
          [13, 1448.7],
          [14, 1448.7],
          [15, 1448.7],
          [16, 1496.4],
          [17, 1496.4],
          [18, 1496.4],
          [19, 1859.2],
          [20, 2034.9],
          [21, 2034.9],
          [22, 2034.9],
          [23, 2034.9],
          [24, 2034.9],
          [25, 2193.4],
          [26, 2393.4],
          [27, 2393.4],
          [28, 2393.4],
          [29, 2393.4],
          [30, 2393.4],
          [31, 2549.8],
          [32, 2549.8],
          [33, 2549.8],
          [34, 2759.1],
          [35, 2759.1],
          [36, 2759.1],
          [37, 2759.1],
        ],
        color: '#3A7CFF',
      },
    ],
  };

  const optins1: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    grid: {
      left: '15px',
      right: '50px',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      name: 't, %',
      type: 'value',
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'category',
      data: ['БУР', 'КЛН', 'ПРМ', 'ПРО', 'НРЩ', 'ШАБ', 'СПО'],
      inverse: true,
    },
    series: [
      {
        data: [10, 3, 5, 2, 8, 4, 12],
        type: 'bar',
        color: '#3A7CFF',
        label: {
          show: true,
        },
      },
    ],
  };

  return (
    <div className="object-work-progress__wrapper">
      <div className="object-work-progress__row">
        <div
          className="object-work-progress__block"
          style={{
            flex: '0',
            border: '2px dashed var(--primary-color)',
          }}
        >
          <h2>Текущая глубина</h2>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: 'var(--primary-color)' }}>
              {rig?.bottom_hole_drilling} м
            </h2>
            <h4>
              осталось{' '}
              {Number(rig?.well_depth) - Number(rig?.bottom_hole_drilling)} м
            </h4>
          </div>

          <div
            style={{
              textAlign: 'center',
            }}
          >
            <h2>Длительность проекта</h2>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ color: 'var(--secondary-color)' }}>
                Факт
                <br />2
              </h2>
              <h3>(в сутках)</h3>
              <h2 style={{ color: 'var(--primary-color)' }}>
                План
                <br />5
              </h2>
            </div>
          </div>

          <h2>Показатель эффективности</h2>
          <h2 style={{ color: 'var(--primary-color)' }}>5.5 %</h2>

          <h2>Отклонение</h2>
          <h2 style={{ color: 'var(--warning-color)' }}>3 %</h2>
        </div>

        <div className="object-work-progress__block">
          <h2>График глубина/день</h2>
          <EChartsReact
            option={options}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      <div className="object-work-progress__row">
        <div className="object-work-progress__block">
          <h2>Операции на скважине</h2>
          <EChartsReact
            option={optins1}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </div>
  );
}
