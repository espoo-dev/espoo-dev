class AddUniqueToRoles < ActiveRecord::Migration[6.1]
  def change
    add_index :roles, :role_type, unique: true
  end
end
