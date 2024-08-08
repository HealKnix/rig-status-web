import './ObjectRobot.scss';

import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectRobotProps {}

const ObjectRobot: FC<ObjectRobotProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return <>ObjectRobot</>;
};

export default ObjectRobot;
