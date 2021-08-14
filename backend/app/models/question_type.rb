class QuestionType < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  has_many :questions, dependent: :nullify

  before_destroy :check_questions_before_destroy, prepend: true

  SINGLE_CHOICE = 'Single Choice'.freeze
  MULTIPLE_CHOICE = 'Multiple Choice'.freeze
  FREE_TEXT = 'Free Text'.freeze

  def single_choice?
    name == SINGLE_CHOICE
  end

  def free_text?
    name == FREE_TEXT
  end

  def check_questions_before_destroy
    questions_count = Question.where(question_type_id: id)

    return unless questions_count.any?

    # i18n-tasks-use t('activerecord.errors.models.question_type.attributes.questions.cant_destroy_question')
    errors.add(:questions, :cant_destroy_question, questions_count: questions_count.count)

    throw :abort
  end
end
