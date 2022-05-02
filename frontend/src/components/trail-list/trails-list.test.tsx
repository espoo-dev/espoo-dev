import { Trail } from '@api/models/trail';
import { useRouter } from 'next/router';
import { fireEvent, render, screen } from 'test-utils';
import { TrailList } from './trails-list';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

let trails = [];

describe('TrailList', () => {
  beforeEach(() => {
    trails = [
      {
        id: 7,
        name: 'English',
        surveys_quantity: 1,
      },
      {
        id: 8,
        name: 'Portuguese',
        surveys_quantity: 4,
      },
      {
        id: 9,
        name: 'Zero Trail',
        surveys_quantity: 0,
      },
    ];
  });

  it('should render each trails with name', () => {
    render(<TrailList data={trails} />);
    trails.forEach((trail: Trail) => {
      expect(screen.getByText(trail.name)).toBeInTheDocument();
    });
  });

  it('should render survey when quantity is one', () => {
    const trail = trails[0];
    render(<TrailList data={[trail]} />);
    expect(
      screen.getByText(`${trail.surveys_quantity} Survey`)
    ).toBeInTheDocument();
  });

  it('should render surveys when quantity is bigger then 1', () => {
    const trail = trails[1];
    render(<TrailList data={[trail]} />);
    expect(
      screen.getByText(`${trail.surveys_quantity} Surveys`)
    ).toBeInTheDocument();
  });

  it('should render surveys when quantity is 0', () => {
    const trail = trails[2];
    render(<TrailList data={[trail]} />);
    expect(
      screen.getByText(`${trail.surveys_quantity} Survey`)
    ).toBeInTheDocument();
  });

  it('should open a specific trail', async () => {
    render(<TrailList data={trails} />);
    const trailItem = screen.getByText(trails[0].name);
    fireEvent.click(trailItem);
    expect(mockRouter.push).toHaveBeenCalledWith(`/trails/${trails[0].id}`);
  });
});
