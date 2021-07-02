module AnswerConcern
  extend ActiveSupport::Concern

  def build_answer(answer_params, option_ids)
    answer = Answer.new(answer_params)
    options = Option.includes(:user, :question).find(option_ids)
    answer.options = options
    answer
  end
end
