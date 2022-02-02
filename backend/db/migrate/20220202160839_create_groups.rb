class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      t.string :description

      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
    add_index :groups, [:name, :user_id], unique: true
  end
end
