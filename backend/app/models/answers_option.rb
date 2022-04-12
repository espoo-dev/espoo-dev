# == Schema Information
#
# Table name: answers_options
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  answer_id  :bigint           not null
#  option_id  :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (answer_id => answers.id)
#  fk_rails_...  (option_id => options.id)
#
class AnswersOption < ApplicationRecord
  belongs_to :answer
  belongs_to :option
end
