class Question < ApplicationRecord
  validates :name, presence: true
  belongs_to :user
  belongs_to :question_type
  belongs_to :survey, optional: true
  has_many :options, dependent: :destroy
end
