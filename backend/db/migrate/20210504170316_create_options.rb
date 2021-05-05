class CreateOptions < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :option_type
      t.references :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
