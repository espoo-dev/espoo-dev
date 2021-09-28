module AnswerConcern
  extend ActiveSupport::Concern

  def build_answer(answer_params, option_ids)
    answer = Answer.new(answer_params)
    unless answer.free_text? || !option_ids
      options = Option.includes(%i[user question]).find(option_ids)
      answer.options = options
    end
    answer
  end
end
