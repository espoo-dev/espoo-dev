class CreateAnswersOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :answers_options do |t|
      t.references :answer, null: false, foreign_key: true
      t.references :option, null: false, foreign_key: true

      t.timestamps
    end
  end
end
