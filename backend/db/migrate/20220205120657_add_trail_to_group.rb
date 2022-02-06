class AddTrailToGroup < ActiveRecord::Migration[6.1]
  def change
    add_column :groups, :trail_id, :integer, null: true, foreign_key: true, index: true
  end
end
