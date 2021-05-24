class Option < ApplicationRecord
  belongs_to :question
  validates :name, presence: true
end
