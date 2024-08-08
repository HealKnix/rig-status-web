import './ObjectStatistic.scss';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import OpenFile from '@/assets/open_file.svg';
import Button from '@/components/Button/Button';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { DrillingStatus } from '@/models/DrillingStatus';
import { Rig } from '@/models/Rig';
import { useQuery } from '@tanstack/react-query';

import { api } from '../../../api/index';

const data = [
  { name: 'Робот', value: 25 },
  { name: 'ВЗД', value: 25 },
  { name: 'Машинное зрение', value: 45 },
  { name: 'Система БР', value: 5 },
];
const COLORS = ['#3D00B8', '#DA7700', '#3A7CFF', '#00C472'];

export default function ObjectStatistic() {
  const { id } = useParams();

  const { data: rig, isFetching } = useQuery({
    queryKey: ['rig retrieve'],
    queryFn: () => api.getById<Rig>('rigs', Number(id)),
  });

  const [mockData, setMockData] = useState([
    {
      name: `${new Date().toLocaleTimeString()}`,
      x: 1,
      y: 25,
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      setMockData((mockData) => [
        ...mockData,
        {
          name: `${new Date().toLocaleTimeString()}`,
          x: mockData[mockData.length - 1].x + 1,
          y: Math.floor(Math.random() * (60 - 20)) + 20,
        },
      ]);
    }, 5000);
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

  if (isFetching) return <span>Загрузка...</span>;

  return (
    <div className="object-statistic__wrapper">
      <div className="object-statistic__header row">
        <Link to="/objects" className="bento_back_btn">
          <ChevronSVG />
        </Link>
        <div className="bento-object-selector">{rig?.name}</div>
      </div>

      <div className="row">
        <div
          className="bento  bento--accent"
          style={{
            height: 'fit-content',
            maxWidth: '100%',
            flex: 1,
          }}
        >
          <h2>План бурения</h2>
          <div>
            <span>{DrillingStatus[rig?.drilling_status_id ?? 1]}</span>
            <ProgressBar
              loader={rig?.drilling_status_id === 1}
              value={
                ((rig?.bottom_hole_drilling ?? 0) / (rig?.well_depth ?? 1)) *
                100
              }
              color={progressBarColor}
              maxValue={100}
            />
          </div>
        </div>
      </div>

      <div
        className="row"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="bento"
          style={{
            maxWidth: '450px',
            flex: 1,
          }}
        >
          <h2>Узлы</h2>
          <div className="bento-content">
            <Button variant="white">
              <>
                <img src={OpenFile} width={33} />
                <span>Винтовой забойный двигатель</span>
              </>
            </Button>
            <Button variant="white">
              <>
                <img src={OpenFile} width={33} />
                Дефектоскоп
              </>
            </Button>
            <Button variant="white">
              <>
                <img src={OpenFile} width={33} />
                Система БР
              </>
            </Button>
            <Button variant="white">
              <>
                <img src={OpenFile} width={33} />
                Талевая система
              </>
            </Button>
            <Button variant="white">
              <>
                <img src={OpenFile} width={33} />
                Робот (СПО)
              </>
            </Button>
          </div>
        </div>

        <div
          className="bento"
          style={{
            display: 'grid',
            justifyContent: 'center',
            maxWidth: '450px',
            flex: 1,
          }}
        >
          <div>
            <PieChart width={250} height={250}>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${_.name}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </div>
          <Button>Смотреть отчёт</Button>
        </div>

        <div
          className="bento"
          style={{
            minWidth: '250px',
            flex: 1,
          }}
        >
          <h2
            style={{
              color: 'var(--text-additional-color)',
            }}
          >
            Датчик
          </h2>
          <hr />
          <div
            style={{
              width: '100%',
            }}
          >
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                width={500}
                height={200}
                data={mockData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="y"
                  stroke="var(--primary-color)"
                  fill="#3A7CFF66"
                  animationDuration={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
