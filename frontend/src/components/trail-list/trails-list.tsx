import { Trail } from '@api/models/trail';
import { useRouter } from 'next/router';
import {
  TrailListContainer,
  TrailListItem,
  TrailTitle,
} from './trail-list.styles';

interface TrailListProps {
  data: Trail[];
}

const TrailList = (props: TrailListProps) => {
  const { data } = props;
  const router = useRouter();

  const openTrail = (trail: Trail) => {
    if (router) {
      router.push(`/trails/${trail.id}`);
    }
  };

  return (
    <TrailListContainer>
      {data.map((trail) => (
        <TrailListItem key={trail.id} onClick={() => openTrail(trail)}>
          <TrailTitle>{trail.name}</TrailTitle>
          <span>
            {`${trail.surveys_quantity} ${
              trail.surveys_quantity > 1 ? 'Surveys' : 'Survey'
            }`}
          </span>
        </TrailListItem>
      ))}
    </TrailListContainer>
  );
};

export default TrailList;
