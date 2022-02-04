class Group < ApplicationRecord
  belongs_to :user
  belongs_to :group_dependency, optional: true
  has_many :surveys, dependent: :nullify
  has_one :required_group_dependency, dependent: :destroy, class_name: 'GroupDependency'

  validates :name, presence: true, uniqueness: { scope: :user_id }

  delegate :groups, to: :required_group_dependency, prefix: :required, allow_nil: true

  def required_groups_ids
    required_groups&.pluck(:id)
  end

  def position
    recursive_position(self, 0)
  end

  private

  def recursive_position(group, sum)
    aux_required_groups = group.required_groups

    if aux_required_groups.present?
      # TODO: this only consider the first required group, but should consider all
      recursive_position(aux_required_groups.first, sum + 1)
    else
      sum
    end
  end
end
