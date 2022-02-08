import { render, screen } from 'test-utils';
import TrailList from './trails-list';

let trails = [];

describe('TrailList', () => {
  beforeEach(() => {
    trails = [
      {
        id: 7,
        name: 'English',
      },
      {
        id: 8,
        name: 'Portuguese',
      },
    ];
  });

  it('should render each trails with name', () => {
    render(<TrailList data={trails} />);
    trails.forEach((trail) => {
      expect(screen.getByText(trail.name)).toBeInTheDocument();
    });
  });
});
