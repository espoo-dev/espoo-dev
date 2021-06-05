require 'rails_helper'

RSpec.describe Option, type: :model do
  let!(:question_single) { create(:single_choice_question) }
  let!(:ready_question) { create(:single_choice_question) }
  let!(:correct_option) { create(:correct_option, question: ready_question) }
  let!(:test_option) { build(:option, question_id: question_single.id, correct: true) }
  let!(:option) { create(:option, correct: true, question_id: question_single.id) }

  it { expect(option).to be_valid }

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:question).required }
  end

  describe 'option validation' do
    before do
      test_option.valid?
      ready_question.update(ready_to_be_answered: true)
    end

    describe 'when many options are set to correct' do
      it { expect(test_option.errors.full_messages).to match(['Single choice questions should have no more than one correct option.']) }
      it { expect(test_option).not_to be_valid }
      it { expect(option.update(name: 'new name')).to be_truthy }
      it { expect(option.errors).to be_empty }
    end

    describe 'when update option of ready question' do
      it { expect(ready_question.ready_to_be_answered).to eq(true) }
      it { expect(correct_option.update(correct: false)).to be_falsy }
    end
  end

  describe 'scopes' do
    before do
      create_list(:option, 2)
      create_list(:option, 3, correct: true)
    end

    it { expect(described_class.correct.count).to eq(5) }
  end
end
