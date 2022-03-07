class GroupDependencyPolicy < GenericPolicy
  class Scope < Scope
    def search_params
      groups_ids = user.groups.map do |group|
        group.group_dependency&.id
      end

      { id: groups_ids }
    end
  end
end
