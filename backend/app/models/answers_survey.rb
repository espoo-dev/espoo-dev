class AnswersSurvey < ApplicationRecord
  belongs_to :user
  belongs_to :survey

  has_many :answers, dependent: :destroy

  NOT_STARTED = 'Not started'.freeze
  STARTED = 'Started'.freeze
  COMPLETED = 'Completed'.freeze

  def status
    survey_questions_count = survey.questions.count
    answers_count = answers.count

    if answers_count.zero?
      NOT_STARTED
    elsif answers_count < survey_questions_count
      STARTED
    elsif answers_count == survey_questions_count
      COMPLETED
    end
  end
end
