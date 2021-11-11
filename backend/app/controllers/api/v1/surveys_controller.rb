class Api::V1::SurveysController < Api::V1::ApiController
  def show
    survey = Survey.where(params.permit(:id)).includes(questions: %i[question_type options]).take!

    answered_questions_quantity = AnswersSurvey.by_user_and_survey(current_user, survey).size

    authorize survey
    render json: {
      survey: SurveySerializer.new(survey),
      answered_questions_quantity: answered_questions_quantity
    }
  end

  def index
    surveys = Survey.ready_surveys_eager.where(params.permit(:user_id))
    authorize surveys
    render json: surveys
  end
end
