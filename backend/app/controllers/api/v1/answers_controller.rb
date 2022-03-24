class Api::V1::AnswersController < Api::V1::ApiController
  include AnswerConcern

  def create
    answer = create_answer

    NotifySurveyCompletedUseCase.call(answer.answers_survey)

    render json: answer, status: :created
  end

  private

  def answer_params
    params.permit(:question_id, :answers_survey_id, :user_answer)
  end

  def option_ids
    params.permit(option_ids: [])[:option_ids]
  end

  def create_answer
    answer = build_answer(answer_params, option_ids)

    authorize answer

    answer.save!

    answer
  end
end
