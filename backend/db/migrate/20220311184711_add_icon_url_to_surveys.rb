class AddIconUrlToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :icon_url, :string
  end
end
