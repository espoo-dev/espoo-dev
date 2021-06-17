class AddColumnToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :ready, :boolean, default: false
  end
end
