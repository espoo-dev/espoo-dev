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
      described_class.destroy_all
      create_list(:option, 2)
      create_list(:option, 3, correct: true)
    end

    it { expect(described_class.correct.count).to eq(3) }
  end

  describe '#validates_correct' do
    let!(:question) { create(:single_choice_question) }
    let!(:option) { create(:correct_option, question: question) }
    let(:option2) { build(:correct_option, question: question) }

    it 'is valid when there is only one correct option for single_choice question' do
      expect(option).to be_valid
    end

    it 'is not valid when there are many correct option for single_choice question' do
      expect(option2).not_to be_valid
    end
  end

  describe '#validates_ready' do
    let!(:question) { create(:multiple_choice_ready_question) }
    let!(:option) { question.options.first }

    describe 'when question is ready' do
      describe 'and there is only one correct option' do
        it 'the option cannot have correct false' do
          option.correct = false

          expect(option).not_to be_valid
        end
      end

      describe 'and there are many correct options' do
        it 'one of the options can have correct false' do
          create(:correct_option, question: question)
          option.correct = false

          expect(option).to be_valid
        end
      end
    end
  end
end
