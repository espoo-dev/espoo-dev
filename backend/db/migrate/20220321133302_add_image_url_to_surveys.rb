class AddImageUrlToSurveys < ActiveRecord::Migration[6.1]
  def change
    add_column :surveys, :image_url, :string
  end
end
