class QuestionsController < ApiController
  def create
    question = Question.create!(create_params)

    render json: question, status: :created
  end

  private

  def create_params
    params.permit(:name)
  end
end
