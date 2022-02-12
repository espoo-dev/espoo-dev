class TrailPresenter < BasePresenter
  attr_reader :trail, :user

  def initialize(trail, user)
    @trail = trail
    @user = user

    super()
  end

  def payload
    {
      id: trail.id,
      name: trail.name,
      groups: groups_payload
    }
  end

  private

  def groups_payload
    trail.ordered_groups.map { |group| GroupPresenter.new(group, user).payload }
  end
end
