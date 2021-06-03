require 'rails_helper'

RSpec.describe QuestionType, type: :model do
  subject { create(:question_type) }

  describe 'uniqueness' do
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  describe 'relationships' do
    it { is_expected.to have_many(:questions).dependent(:destroy) }
  end

  describe '#destroy' do
    describe 'When there are questions for question type' do
      let!(:question_type) { create(:question).question_type }

      it 'does not destroy' do
        question_type.destroy
        expect(question_type.errors.full_messages.first).to match("Can't destroy question type with 1 questions")
      end

      it { expect(described_class.count).to eq(1) }
    end

    describe 'When there are no questions for question type' do
      let!(:question_type) { create(:question_type) }

      it { expect(question_type.destroy).to be_truthy }

      it 'does not have any questions when delete question_type' do
        question_type.destroy
        expect(described_class.count).to be_zero
      end
    end
  end
end
