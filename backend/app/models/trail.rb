class Trail < ApplicationRecord
  has_many :groups, dependent: :nullify
  belongs_to :user, dependent: :destroy

  def surveys_quantity
    groups.reduce(0) do |sum, group|
      sum + group.surveys.count
    end
  end
end
