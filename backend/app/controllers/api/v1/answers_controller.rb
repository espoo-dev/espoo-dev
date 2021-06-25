class Api::V1::AnswersController < Api::V1::ApiController
  def create
    answer = Answer.new(answer_params)
    params[:option_ids].each do |option|
      answer.options << Option.find(option)
    end
    authorize answer
    answer.save!
    render json: answer, status: :created
  end

  private

  def answer_params
    params.permit(:question_id, :answers_survey_id)
  end
end
