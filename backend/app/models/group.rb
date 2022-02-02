class Group < ApplicationRecord
  belongs_to :user
  has_many :surveys, dependent: :nullify

  validates :name, presence: true, uniqueness: { scope: :user_id }
end
