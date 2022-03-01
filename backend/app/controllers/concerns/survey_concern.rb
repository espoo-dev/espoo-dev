module SurveyConcern
  extend ActiveSupport::Concern

  # :reek:TooManyStatements
  def sorted_surveys(surveys)
    sorted_surveys = {
      not_started: [],
      without_answer_survey: [],
      started: [],
      completed: []
    }

    surveys.each do |survey|
      case survey.answers_surveys.last&.status
      when AnswersSurvey::NOT_STARTED
        sorted_surveys[:not_started] << survey
      when AnswersSurvey::COMPLETED
        sorted_surveys[:completed] << survey
      when AnswersSurvey::STARTED
        sorted_surveys[:started] << survey
      else
        sorted_surveys[:without_answer_survey] << survey
      end
    end

    sorted_surveys
  end
end
