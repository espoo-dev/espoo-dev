class AnswersSurvey < ApplicationRecord
  belongs_to :user
  belongs_to :survey

  has_many :answers, dependent: :destroy
end
