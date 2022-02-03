class Group < ApplicationRecord
  belongs_to :user
  belongs_to :group_dependency, optional: true
  has_many :surveys, dependent: :nullify
  has_one :required_group_dependency, dependent: :destroy, class_name: 'GroupDependency'

  validates :name, presence: true, uniqueness: { scope: :user_id }
end
