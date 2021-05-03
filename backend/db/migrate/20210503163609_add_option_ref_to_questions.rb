class AddOptionRefToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_reference :questions, :option, null: false, foreign_key: true
  end
end
