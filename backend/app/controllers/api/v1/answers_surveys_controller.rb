class Api::V1::AnswersSurveysController < Api::V1::ApiController
  def create
    answers_survey = AnswersSurvey.new(answers_surveys_params)
    authorize answers_survey
    answers_survey.save!

    answers_survey_presenter = AnswersSurveyPresenter.new(answers_survey)
    render json: answers_survey_presenter.payload, status: :created
  end

  def show
    answers_survey = AnswersSurvey.where(params.permit(:id)).includes(survey: [questions: %i[question_type options]]).take!

    authorize answers_survey

    render json: AnswersSurveyWithAnswersPresenter.payload(answers_survey), status: :ok
  end

  private

  def answers_surveys_params
    params.permit(:survey_id).merge(user_id: current_user.id)
  end
end
