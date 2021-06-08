class AddIndexUniqueToNameInOptions < ActiveRecord::Migration[6.1]
  def change
    add_index :options, [:name, :question_id], unique: true
  end
end
