import './Objects.scss';

import { Link } from 'react-router-dom';

import ObjectCard from '@/components/ObjectCard/ObjectCard';
import ChevronSVG from '@/components/SVGs/ChevronSVG';
import { rigService } from '@/services/rig.service';
import { useQuery } from '@tanstack/react-query';

export default function Objects() {
  const { data } = useQuery({
    queryKey: ['rig list'],
    queryFn: () => rigService.get(),
  });

  return (
    <>
      <div className="objects__wrapper">
        <div className="objects__header row">
          <Link to="/console" className="bento_back_btn">
            <ChevronSVG />
          </Link>
          <div className="bento-object-selector">
            <span>Буровые установки</span>
          </div>
        </div>

        <div className="cards__wrapper">
          {data?.map((rig) => <ObjectCard {...rig} key={rig.id} />)}
        </div>
      </div>
    </>
  );
}
