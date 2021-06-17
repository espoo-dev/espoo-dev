class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.references :question, null: false
      t.references :option, null: false
      t.references :answers_survey, null: false

      t.timestamps
    end
  end
end
