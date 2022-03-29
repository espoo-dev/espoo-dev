class AddImageUrlToQuestions < ActiveRecord::Migration[6.1]
  def change
    add_column :questions, :image_url, :string
  end
end
