import { Group } from '@api/models/group';
import { render, screen, fireEvent } from 'test-utils';
import mockManyGroups from 'utils/mocks/groups';
import RoadmapSurvey from './roadmap-survey';

let groups: Group[] = [];

describe('RoadmapSurvey', () => {
  beforeEach(() => {
    groups = JSON.parse(JSON.stringify(mockManyGroups));
  });

  it('should render component with all groups', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.forEach((group) =>
      expect(rendered.getByTestId(`group-${group.id}`)).toBeInTheDocument()
    );
  });

  it('should show all survey names', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.forEach((group) =>
      group.surveys.forEach((survey) =>
        expect(rendered.getByText(survey.name)).toBeInTheDocument()
      )
    );
  });

  it('should render available and doing surveys in green scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[0].surveys[0].name}`)).toHaveStyle(
      'background: green'
    );
    expect(screen.getByTestId(`icon-${groups[1].surveys[0].name}`)).toHaveStyle(
      'background: green'
    );
  });

  it('should render blocked surveys in gray scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[2].surveys[0].name}`)).toHaveStyle(
      'background: gray'
    );
  });
});
