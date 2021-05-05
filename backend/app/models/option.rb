class Option < ApplicationRecord
  belongs_to :question
  validates :option_type, presence: true
end
