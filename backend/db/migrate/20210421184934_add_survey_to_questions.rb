class AddSurveyToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :survey_id, :integer, null: true
    add_index  :questions, :survey_id
  end
end
