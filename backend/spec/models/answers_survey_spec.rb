require 'rails_helper'

RSpec.describe AnswersSurvey, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:survey).required }
    it { is_expected.to have_many(:answers).dependent(:destroy) }
  end
end
