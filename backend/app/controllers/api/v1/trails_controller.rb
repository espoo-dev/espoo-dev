class Api::V1::TrailsController < Api::V1::ApiController
  def index
    trails = Trail.all.includes(groups: [])

    authorize trails

    render json: parsed_trails(trails)
  end

  def show
    trail = Trail.where(params.permit(:id))
                 .includes(groups: [surveys: [questions: %i[question_type options]], required_group_dependency: [groups: []]]).take!

    authorize trail

    render json: parsed_trail(trail)
  end

  private

  def parsed_trails(trails)
    trails.map { |trail| SimpleTrailPresenter.new(trail, current_user).payload }
  end

  def parsed_trail(trail)
    TrailPresenter.new(trail, current_user).payload
  end
end
