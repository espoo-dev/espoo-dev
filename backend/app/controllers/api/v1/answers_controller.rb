class Api::V1::AnswersController < Api::V1::ApiController
  def create
    answer = Answer::AnswerCreator.call(**creator_arguments)

    render json: answer, status: :created
  end

  private

  def creator_arguments
    { answer_params: answer_params, option_ids: option_ids, user: current_user }
  end

  def answer_params
    params.permit(:question_id, :answers_survey_id, :user_answer)
  end

  def option_ids
    params.permit(option_ids: [])[:option_ids]
  end
end
