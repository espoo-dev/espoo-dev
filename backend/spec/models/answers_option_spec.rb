require 'rails_helper'

RSpec.describe AnswersOption, type: :model do
  describe 'relationships' do
    %i[option answer].each do |sym|
      it { is_expected.to belong_to(sym).required }
    end
  end
end
