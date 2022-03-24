class Answer < ApplicationRecord
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
end
