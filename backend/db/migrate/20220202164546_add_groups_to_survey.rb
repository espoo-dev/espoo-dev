class AddGroupsToSurvey < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :group_id, :integer, null: true
    add_index  :surveys, :group_id
  end
end
