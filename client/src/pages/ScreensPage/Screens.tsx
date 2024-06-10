import './Screens.scss';

import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ChevronSVG from '@/components/SVGs/ChevronSVG';

const data = [
  {
    name: '10:00',
    x: 1,
    y: 25,
  },
  {
    name: '11:00',
    x: 2,
    y: 32,
  },
  {
    name: '12:00',
    x: 3,
    y: 30,
  },
  {
    name: '13:00',
    x: 4,
    y: 31,
  },
  {
    name: '14:00',
    x: 5,
    y: 35,
  },
  {
    name: '15:00',
    x: 6,
    y: 28,
  },
  {
    name: '16:00',
    x: 7,
    y: 37,
  },
  {
    name: '17:00',
    x: 8,
    y: 45,
  },
  {
    name: '18:00',
    x: 9,
    y: 38,
  },
];

export default function Screens() {
  return (
    <>
      <div className="screens__wrapper">
        <div className="screens__header row">
          <Link to="/console" className="row__back">
            <ChevronSVG />
          </Link>
          <div className="object-selector">
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
          <div className="row--fill">
            <h2>Датчик: Температура</h2>
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
      </div>
    </>
  );
}
