import './ObjectWorkplace.scss';

import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useObjectIdStore } from '@/store/useObjectIdStore';

interface ObjectWorkplaceProps {}

const ObjectWorkplace: FC<ObjectWorkplaceProps> = () => {
  const { id } = useParams();
  const objectIdStore = useObjectIdStore();

  useEffect(() => {
    objectIdStore.setId(Number(id));

    return () => {
      objectIdStore.setId(null);
    };
  }, [id]);

  return <>Workplace</>;
};

export default ObjectWorkplace;
