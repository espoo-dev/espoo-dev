class AddIndexToNameInQuestions < ActiveRecord::Migration[6.1]
  def change
    add_index :questions, [:name, :user_id], unique: true
  end
end
