class AddUniqueIndexToAnswerByAnswersSurveyAndQuestionId < ActiveRecord::Migration[6.1]
  def change
    add_index :answers, [:question_id, :answers_survey_id], unique: true
  end
end
