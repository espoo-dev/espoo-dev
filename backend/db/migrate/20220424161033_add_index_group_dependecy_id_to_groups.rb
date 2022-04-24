class AddIndexGroupDependecyIdToGroups < ActiveRecord::Migration[7.0]
  def change
    add_index :groups, :group_dependency_id
  end
end
