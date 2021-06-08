class AddColumnToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :ready_to_be_answered, :boolean, default: false
  end
end
