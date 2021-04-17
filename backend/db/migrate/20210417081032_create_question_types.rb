class CreateQuestionTypes < ActiveRecord::Migration[6.1]
  def change
    create_table :question_types do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :question_types, :name, unique: true
  end
end
