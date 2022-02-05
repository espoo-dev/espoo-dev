import { Survey } from '@api/models/survey';
import { Button } from '@styles/utils';
import { render, screen } from 'test-utils';
import RoadmapSurvey from './roadmap-survey';

let groups = [];

describe('RoadmapSurvey', () => {
  beforeEach(() => {
    groups = [
      {
        id: 1,
        name: 'Introduction',
        group_dependencies_ids: [],
        surveys: [
          {
            name: 'Introduction',
            icon: 'url',
          },
        ],
        position: 1,
        status: 'Available',
      },
      {
        id: 2,
        name: 'Basic1',
        group_dependencies_ids: [1],
        surveys: [
          {
            name: 'Regards',
            icon: 'url',
          },
          {
            name: 'Travel',
            icon: 'url',
          },
        ],
        position: 2,
        status: 'Doing',
      },
      {
        id: 3,
        name: 'Simple Present',
        group_dependencies_ids: [2],
        surveys: [
          {
            name: 'Store',
            icon: 'url',
          },
          {
            name: 'My day',
            icon: 'url',
          },
        ],
        position: 3,
        status: 'Blocked',
      },
    ];
  });

  it('should render component with all groups', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.map((group) => {
      expect(rendered.getByTestId(`group-${group.id}`)).toBeInTheDocument();
    });
  });

  it('should show all survey names', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.map((group) => {
      group.surveys.map((survey: Survey) => {
        expect(rendered.getByText(survey.name)).toBeInTheDocument();
      });
    });
  });

  it('should render available and doing surveys in green scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId('icon-' + groups[0].surveys[0].name)).toHaveStyle(
      'background: green'
    );
    expect(screen.getByTestId('icon-' + groups[1].surveys[0].name)).toHaveStyle(
      'background: green'
    );
  });

  it('should render blocked surveys in gray scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId('icon-' + groups[2].surveys[0].name)).toHaveStyle(
      'background: gray'
    );
  });
});
