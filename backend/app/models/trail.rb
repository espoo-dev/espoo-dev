# == Schema Information
#
# Table name: trails
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  user_id     :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Trail < ApplicationRecord
  has_many :groups, dependent: :nullify
  belongs_to :user, dependent: :destroy

  def surveys_quantity
    groups.reduce(0) do |sum, group|
      sum + group.surveys.count
    end
  end

  def ordered_groups
    groups.sort_by(&:position)
  end
end
