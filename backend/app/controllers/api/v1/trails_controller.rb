class Api::V1::TrailsController < Api::V1::ApiController
  def index
    trails = Trail.all.includes(groups: [surveys: [questions: %i[question_type options]], required_group_dependency: [groups: []]])

    authorize trails

    render json: parsed_trails(trails)
  end

  private

  def parsed_trails(trails)
    trails.map { |trail| TrailPresenter.new(trail, current_user).payload }
  end
end
