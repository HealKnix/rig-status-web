import './Screens.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';

import RadialProgressBar from '@/components/RadialProgressBar/RadialProgressBar';
import ChevronSVG from '@/components/SVGs/ChevronSVG';

export default function Screens() {
  const [data, setData] = useState([
    {
      name: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      x: 1,
      y: 25,
    },
  ]);

  useEffect(() => {
    setInterval(() => {
      setData((data) => [
        ...data,
        {
          name: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          x: data[data.length - 1].x + 1,
          y: Math.floor(Math.random() * (60 - 20)) + 20,
        },
      ]);
    }, 10000);
  }, []);

  return (
    <>
      <div className="screens__wrapper">
        <div className="screens__header row">
          <Link to="/console" className="bento_back_btn">
            <ChevronSVG />
          </Link>
          <div className="bento-object-selector">
            <select name="objects" id="object-select">
              <option value="0">Объект_0</option>
              <option value="1">Объект_1</option>
              <option value="2">Объект_2</option>
              <option value="3">Объект_3</option>
              <option value="4">Объект_4</option>
              <option value="5">Объект_5</option>
              <option value="6">Объект_6</option>
              <option value="7">Объект_7</option>
            </select>
          </div>
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
                  data={data}
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
                    fill="var(--primary-color)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="bento fit">
            <h2
              style={{
                color: 'var(--text-additional-color)',
              }}
            >
              Датчик: Температура
            </h2>
            <hr />
            <div className="bento__content">
              <RadialProgressBar
                maxValue={60}
                value={data[data.length - 1].y}
                postfix="°"
                boundaries={[
                  { color: 'var(--error-color)', value: 61 },
                  { color: 'var(--warning-color)', value: 50 },
                  { color: 'var(--success-color)', value: 30 },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
