class GroupDependency < ApplicationRecord
  belongs_to :group
  has_many :groups, dependent: :nullify
end
