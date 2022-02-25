import { Trail } from '@api/models/trail';
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

  return (
    <TrailListContainer>
      {data.map((trail) => (
        <TrailListItem key={trail.id}>
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
