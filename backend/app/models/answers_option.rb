# == Schema Information
#
# Table name: answers_options
#
#  id         :bigint           not null, primary key
#  answer_id  :bigint           not null
#  option_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AnswersOption < ApplicationRecord
  belongs_to :answer
  belongs_to :option
end
