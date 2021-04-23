require 'rails_helper'

RSpec.describe QuestionType, type: :model do
  describe 'uniqueness' do
    subject { create(:question_type) }

    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }

    describe 'relationships' do
      it { is_expected.to have_many(:questions).dependent(:destroy) }
    end
  end
end
