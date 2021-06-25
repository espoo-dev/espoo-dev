require 'rails_helper'

RSpec.describe AnswersOption, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:option).required }
    it { is_expected.to belong_to(:answer).required }
  end
end
