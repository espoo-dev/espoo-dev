import { Trail } from '@api/models/trail';
import { TrailListContainer } from './trail-list.styles';

interface TrailListProps {
  data: Trail[];
}

const TrailList = (props: TrailListProps) => {
  const { data } = props;

  return (
    <TrailListContainer>
      {data.map((trail) => (
        <div key={trail.id}>
          <span>{trail.name}</span>
        </div>
      ))}
    </TrailListContainer>
  );
};

export default TrailList;
