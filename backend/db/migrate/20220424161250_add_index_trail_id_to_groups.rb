class AddIndexTrailIdToGroups < ActiveRecord::Migration[7.0]
  def change
    add_index :groups, :trail_id
  end
end
