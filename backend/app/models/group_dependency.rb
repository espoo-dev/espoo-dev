# == Schema Information
#
# Table name: group_dependencies
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  group_id   :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (group_id => groups.id)
#
class GroupDependency < ApplicationRecord
  belongs_to :group
  has_many :groups, dependent: :nullify
end
