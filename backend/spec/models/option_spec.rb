require 'rails_helper'

RSpec.describe Option, type: :model do
  let!(:question_single) { create(:single_choice_question) }
  let!(:option) { build(:option, question_id: question_single.id, correct: true) }

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
      create(:option, correct: true, question_id: question_single.id)
      option.valid?
    end

    describe 'when many options are set to correct' do
      it { expect(option.errors.full_messages).to match(['Single choice questions should have no more than one correct option.']) }
      it { expect(option).not_to be_valid }
    end
  end

  describe 'scopes' do
    before do
      Option.destroy_all
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

          expect(option).to_not be_valid
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
