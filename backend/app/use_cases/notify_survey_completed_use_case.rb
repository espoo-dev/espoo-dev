class NotifySurveyCompletedUseCase < BaseUseCase
  def initialize(answers_survey)
    @answers_survey = answers_survey
  end

  def call
    SlackNotifierService.call(message) if @answers_survey.completed?
  end

  private

  def message
    survey = @answers_survey.survey

    count_completed_surveys = survey.answers_surveys.completed.count.count

    teacher_email = survey.user.email

    "Survey \"#{survey.name}\" from teacher \"#{teacher_email}\" has "\
    "been answered now.\nThis survey has #{count_completed_surveys} "\
    "answers in the total."
  end
end
