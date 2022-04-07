# == Schema Information
#
# Table name: answers_surveys
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  survey_id  :bigint           not null
#  user_id    :bigint           not null
#
class AnswersSurvey < ApplicationRecord
  belongs_to :user
  belongs_to :survey

  has_many :answers, dependent: :destroy

  validate :unique_not_completed_by_survey

  delegate :questions, to: :survey, allow_nil: true

  scope :by_user_and_survey, lambda { |user, survey|
    return where(user: user, survey: survey)
  }

  NOT_STARTED = 'Not started'.freeze
  STARTED = 'Started'.freeze
  COMPLETED = 'Completed'.freeze

  STATUS_ORDER = [
    NOT_STARTED,
    STARTED,
    COMPLETED
  ].freeze

  def status
    survey_questions_count = survey&.questions&.count || 0
    answers_count = answers.count

    if answers_count.zero?
      NOT_STARTED
    elsif answers_count < survey_questions_count
      STARTED
    elsif answers_count == survey_questions_count
      COMPLETED
    end
  end

  def not_completed?
    !completed?
  end

  def completed?
    status == COMPLETED
  end

  def answers_ids
    answers.map(&:id)
  end

  private

  def unique_not_completed_by_survey
    return if completed?

    answers_surveys_by_user_and_suervey = self.class.by_user_and_survey(user, survey) - [self]
    not_completed_answers_survey = answers_surveys_by_user_and_suervey.any?(&:not_completed?)
    # i18n-tasks-use t('activerecord.errors.models.answers_survey.attributes.base.multiple_not_completed_answers_survey')
    errors.add(:base, :multiple_not_completed_answers_survey) if not_completed_answers_survey
  end
end
