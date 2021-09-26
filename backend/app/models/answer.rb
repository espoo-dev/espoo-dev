class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :answers_survey

  has_many :answers_options, dependent: :destroy
  has_many :options, through: :answers_options

  validates :user_answer, presence: true, if: :free_text?
  validates :question_id, presence: true, uniqueness: { scope: :answers_survey_id }

  delegate :free_text?, to: :question, allow_nil: true
end
