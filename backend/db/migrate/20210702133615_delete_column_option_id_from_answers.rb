class DeleteColumnOptionIdFromAnswers < ActiveRecord::Migration[6.1]
  def change
    remove_column :answers, :option_id
  end
end
