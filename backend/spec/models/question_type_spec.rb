require 'rails_helper'

RSpec.describe QuestionType, type: :model do
  subject { build(:question_type) }

  describe 'uniqueness' do
    it { is_expected.to validate_uniqueness_of(:name).case_insensitive }
  end

  describe 'relationships' do
    it { is_expected.to have_many(:questions).dependent(:nullify) }
  end

  describe '#destroy' do
    describe 'When there are questions for question type' do
      let!(:question_type) { create(:question).question_type }

      it 'does not destroy' do
        question_type.destroy
        expect(question_type.errors.full_messages.first).to match("Can't destroy question type with 1 questions")
      end

      it "doesn't delete the question type" do
        question_type.destroy
        expect(described_class.count).to eq(1)
      end
    end

    describe 'When there are no questions for question type' do
      let!(:question_type) { create(:question_type) }

      it { expect(question_type.destroy).to be_truthy }

      it 'deletes the question type' do
        question_type.destroy
        expect(described_class.count).to be_zero
      end
    end
  end

  describe 'factory only creates one instance of each question type' do
    # rubocop:disable RSpec/IdenticalEqualityAssertion
    it { expect(create(:question_type_single)).to eq(create(:question_type_single)) }

    it { expect(create(:question_type_multiple)).to eq(create(:question_type_multiple)) }
    # rubocop:enable RSpec/IdenticalEqualityAssertion
  end
end
