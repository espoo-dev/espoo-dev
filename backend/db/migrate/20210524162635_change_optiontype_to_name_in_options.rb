class ChangeOptiontypeToNameInOptions < ActiveRecord::Migration[6.1]
  def change
    rename_column :options, :option_type, :name
  end
end
