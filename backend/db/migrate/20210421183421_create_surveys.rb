class CreateSurveys < ActiveRecord::Migration[6.1]
  def change
    create_table :surveys do |t|
      t.string :name
      t.string :description

      t.references :user, null: false

      t.timestamps
    end
  end
end
