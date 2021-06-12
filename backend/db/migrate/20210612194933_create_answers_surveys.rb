class CreateAnswersSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :answers_surveys do |t|
      t.references :survey, null: false
      t.references :user, null: false

      t.timestamps
    end
  end
end
