module AnswerConcern
  extend ActiveSupport::Concern

  def build_answer(answer_params, option_ids)
    answer = Answer.new(answer_params)
    if !answer.free_text?
      options = Option.includes(:user, :question).find(option_ids)
      answer.options = options
    end
    answer
  end
end
