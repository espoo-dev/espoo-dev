class SimpleTrailPresenter < BasePresenter
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
      surveys_quantity: trail.surveys_quantity
    }
  end
end
