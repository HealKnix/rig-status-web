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
      left: '3%',
      right: '4%',
      top: '45px',
      bottom: '50px',
      containLabel: true,
    },
    xAxis: {},
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
          [0, 0],
          [5, 8],
          [10, 23],
          [13, 23],
          [20, 40],
        ],
        color: '#00C472',
      },
      {
        name: 'Факт',
        type: 'line',
        smooth: true,
        data: [
          [0, 0],
          [5, 10],
          [10, 25],
          [13, 26],
          [20, 42],
        ],
        color: '#FF7C3A',
      },
      {
        name: 'План',
        type: 'line',
        smooth: true,
        data: [
          [0, 0],
          [5, 12],
          [10, 27],
          [13, 25],
          [20, 45],
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
      left: '3%',
      right: '4%',
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
