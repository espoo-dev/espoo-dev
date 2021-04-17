class QuestionType < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  has_many :questions, dependent: :destroy
end
