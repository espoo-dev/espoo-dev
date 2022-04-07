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
require 'rails_helper'

RSpec.describe AnswersOption, type: :model do
  describe 'relationships' do
    %i[option answer].each do |sym|
      it { is_expected.to belong_to(sym).required }
    end
  end
end
