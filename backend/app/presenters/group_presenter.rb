class GroupPresenter < BasePresenter
  attr_reader :group, :user

  def initialize(group, user)
    @group = group
    @user = user

    super()
  end

  def payload
    {
      id: group.id,
      name: group.name,
      surveys: surveys_payload,
      required_groups_ids: group.required_groups_ids,
      position: group.position,
      status: group.status
    }
  end

  private

  def surveys_payload
    group.surveys.map { |survey| SurveyPresenter.new(survey, user).payload }
  end
end
