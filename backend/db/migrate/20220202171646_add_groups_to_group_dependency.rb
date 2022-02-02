class AddGroupsToGroupDependency < ActiveRecord::Migration[6.1]
  def change
    add_column :groups, :group_dependency_id, :integer, null: true, foreign_key: true, index: true
  end
end
