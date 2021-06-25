module AnswerConcern
  extend ActiveSupport::Concern

  def build_answer(answer_params)
    answer = Answer.new(answer_params)
    params[:option_ids].each do |option|
      answer.options << Option.find(option)
    end
    answer
  end
end
