class AddtypeToQuestion < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :question_type_id, :integer, null: false
    add_index  :questions, :question_type_id
  end
end
