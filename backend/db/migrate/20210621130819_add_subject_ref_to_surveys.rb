class AddSubjectRefToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_reference :surveys, :survey_subject, null: false, foreign_key: true
  end
end
