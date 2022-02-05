class Trail < ApplicationRecord
  has_many :groups, dependent: :nullify
  belongs_to :user, dependent: :destroy
end
