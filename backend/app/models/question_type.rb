class QuestionType < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  has_many :questions, dependent: :destroy

  def single_choice?
    name == QuestionType::SINGLE_CHOICE
  end

  SINGLE_CHOICE = 'Single Choice'.freeze
  MULTIPLE_CHOICE = 'Multiple Choice'.freeze
end
