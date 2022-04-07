# == Schema Information
#
# Table name: trails
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
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
