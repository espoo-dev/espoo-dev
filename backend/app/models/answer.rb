class Answer < ApplicationRecord
  after_save :notify_slack, if: :answers_survey_completed?

  belongs_to :question
  belongs_to :answers_survey

  has_many :answers_options, dependent: :destroy
  has_many :options, through: :answers_options

  validates :user_answer, presence: true, if: :free_text?
  validates :question_id, presence: true, uniqueness: { scope: :answers_survey_id }
  validate :minimum_one_option
  validate :maximum_one_option

  delegate :free_text?, to: :question, allow_nil: true
  delegate :single_choice?, to: :question, allow_nil: true

  private

  def minimum_one_option
    # i18n-tasks-use t('activerecord.errors.models.answer.attributes.options.at_least_one_option')
    errors.add(:options, :at_least_one_option) if !free_text? && options.empty?
  end

  def maximum_one_option
    # i18n-tasks-use t('activerecord.errors.models.answer.attributes.question_id.only_one_option')
    errors.add(:question_id, :only_one_option) if single_choice? && options.length > 1
  end

  def answers_survey_completed?
    answers_survey.completed?
  end

  def notify_slack
    SlackNotifierService.call(message_slack)
    puts "I'm here"
  end

  def message_slack
    survey = answers_survey.survey
    count_completed_surveys = survey.answers_surveys.select { |a| a.completed? }.count
    teacher_email = answers_survey.survey.user.email

    
    "Survey \"#{survey.name}\" from teacher \"#{teacher_email}\" has "\
    "been answered now.\nThis survey has #{count_completed_surveys} "\
    "answers in the total."
  end
end
