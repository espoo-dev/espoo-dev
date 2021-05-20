class AddRoleReferencesToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :role, null: false, foreign_key: true
  end
end
