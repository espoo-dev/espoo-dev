class Api::V1::AnswersController < Api::V1::ApiController
  include AnswerConcern

  def create
    answer = build_answer(answer_params)
    authorize answer
    answer.save!
    render json: answer, status: :created
  end

  private

  def answer_params
    params.permit(:question_id, :answers_survey_id)
  end
end
