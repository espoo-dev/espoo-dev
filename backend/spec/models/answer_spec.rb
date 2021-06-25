require 'rails_helper'

RSpec.describe Answer, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:question).required }
    it { is_expected.to belong_to(:answers_survey).required }
    it { is_expected.to have_many(:answers_options).dependent(:destroy) }
    it { is_expected.to have_many(:options) }
  end
end
