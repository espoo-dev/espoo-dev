class Api::V1::GroupsController < Api::V1::ApiController
  def index
    groups = Group.all.includes(surveys: [questions: %i[question_type options]])

    authorize groups

    render json: parsed_groups(groups)
  end

  private

  def parsed_groups(groups)
    groups.map { |group| GroupPresenter.new(group, current_user).payload }
  end
end
