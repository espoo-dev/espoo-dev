class AddFreeTextToAnswer < ActiveRecord::Migration[6.1]
  def change
    add_column :answers, :user_answer, :string
  end
end
