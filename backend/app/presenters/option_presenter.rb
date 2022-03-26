class OptionPresenter < BasePresenter
  def initialize(option, user = nil)
    @option = option
    @user = user

    super()
  end

  def payload
    {
      id: @option.id,
      name: @option.name,
      correct: @option.correct
    }
  end
end
