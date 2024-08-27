import './Objects.scss';

import { api } from '@/api';
import Loader from '@/components/Loader/Loader';
import ObjectCard from '@/components/ObjectCard/ObjectCard';
import { Rig } from '@/models/Rig';
import { useQuery } from '@tanstack/react-query';

export default function Objects() {
  const { data, isFetching, isFetched } = useQuery({
    queryKey: ['rig list'],
    queryFn: () => api.get<Rig>('rigs'),
  });

  if (isFetching && !isFetched) return <Loader />;

  return (
    <div className="objects__wrapper">
      {data?.map((rig) => <ObjectCard {...rig} key={rig.id} />)}
    </div>
  );
}
