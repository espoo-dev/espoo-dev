class AddColumnToOptions < ActiveRecord::Migration[6.1]
  def change
    add_column :options, :correct, :boolean, default: false
  end
end
