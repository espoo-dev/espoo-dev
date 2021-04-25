class AddUserToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :user_id, :integer, null: false
    add_index  :questions, :user_id
  end
end
