import './ObjectStatistic.scss';

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import RadialProgressBar from '@/components/RadialProgressBar/RadialProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { sensorDataService } from '@/services/sensor.service';
import { useQuery } from '@tanstack/react-query';

export default function ObjectStatistic() {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['sensor list'],
    queryFn: () => sensorDataService.get(),
  });

  const [mockData, setMockData] = useState([
    {
      name: `${new Date().toLocaleTimeString()}`,
      x: 1,
      y: 25,
    },
  ]);

  useEffect(() => {
    console.log(data);

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

  return (
    <>
      <div className="object-statistic__wrapper">
        <div className="object-statistic__header row">
          <Link to="/objects" className="bento_back_btn">
            <ChevronSVG />
          </Link>
          <div className="bento-object-selector"></div>
        </div>

        <div className="row">
          <div className="bento">
            <h2
              style={{
                color: 'var(--text-additional-color)',
              }}
            >
              Датчик: Температура
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

        <div className="row">
          {data?.map((sensor) => (
            <div className="bento fit">
              <h2
                style={{
                  color: 'var(--text-additional-color)',
                }}
              >
                {sensor.name}
              </h2>
              <hr />
              <div className="bento__content">
                <RadialProgressBar
                  maxValue={60}
                  value={50}
                  postfix={sensor.unit}
                  boundaries={[
                    { color: 'var(--error-color)', value: 60 },
                    { color: 'var(--warning-color)', value: 50 },
                    { color: 'var(--success-color)', value: 30 },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
