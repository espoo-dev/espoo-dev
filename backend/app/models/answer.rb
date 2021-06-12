class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :option
  belongs_to :answers_survey
end
