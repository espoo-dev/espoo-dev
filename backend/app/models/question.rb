class Question < ApplicationRecord
  validates :name, presence: true
  belongs_to :question_type
end
