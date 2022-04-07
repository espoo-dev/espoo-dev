# == Schema Information
#
# Table name: group_dependencies
#
#  id         :bigint           not null, primary key
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class GroupDependency < ApplicationRecord
  belongs_to :group
  has_many :groups, dependent: :nullify
end
