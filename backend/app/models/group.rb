# :reek:MissingSafeMethod { exclude: [ add_required_group! ] }
class Group < ApplicationRecord
  belongs_to :user
  belongs_to :trail, optional: true
  belongs_to :group_dependency, optional: true
  has_many :surveys, dependent: :nullify
  has_one :required_group_dependency, dependent: :destroy, class_name: 'GroupDependency'

  validates :name, presence: true, uniqueness: { scope: :user_id }

  delegate :groups, to: :required_group_dependency, prefix: :required, allow_nil: true

  STATUS_AVAILABLE = 'Available'.freeze
  STATUS_COMPLETED = 'Completed'.freeze
  STATUS_DOING = 'Doing'.freeze
  STATUS_BLOCKED = 'Blocked'.freeze

  def add_required_group!(required_group)
    required_group_dependency ||= GroupDependency.create(group: self, groups: [required_group])
    required_group_dependency.groups.push(required_group)
    save!
  end

  def required_groups_ids
    required_groups&.pluck(:id) || []
  end

  def position
    recursive_position(self, 0)
  end

  def status(answering_user)
    all_required_groups_completed = all_required_groups_completed?(answering_user)
    all_surveys_completed = all_surveys_completed?(answering_user)
    if required_groups_ids.empty?
      STATUS_AVAILABLE
    elsif all_required_groups_completed && all_surveys_completed
      STATUS_COMPLETED
    elsif all_required_groups_completed && !all_surveys_completed
      STATUS_DOING
    else
      STATUS_BLOCKED
    end
  end

  def all_required_groups_completed?(answering_user)
    required_groups&.all? do |group|
      group.all_surveys_completed?(answering_user)
    end
  end

  def all_surveys_completed?(answering_user)
    surveys.all? do |survey|
      AnswersSurvey.by_user_and_survey(answering_user, survey).last&.completed?
    end
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
