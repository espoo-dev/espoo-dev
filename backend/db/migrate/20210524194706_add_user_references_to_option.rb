class AddUserReferencesToOption < ActiveRecord::Migration[6.1]
  def change
    add_reference :options, :user, null: false, foreign_key: true
  end
end
