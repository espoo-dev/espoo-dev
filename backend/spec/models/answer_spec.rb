require 'rails_helper'

RSpec.describe Answer, type: :model do
  subject { build(:answer) }

  describe 'relationships' do
    it { is_expected.to belong_to(:question).required }
    it { is_expected.to belong_to(:answers_survey).required }
    it { is_expected.to have_many(:answers_options).dependent(:destroy) }
    it { is_expected.to have_many(:options) }
  end

  describe 'uniqueness' do
    it { is_expected.to validate_uniqueness_of(:question_id).scoped_to(:answers_survey_id) }
  end

  describe 'free_text validations' do
    context 'when question has no user_answer' do
      it 'is not valid' do
        answer = build(:free_text_answer, options: [], user_answer: nil)
        expect(answer).not_to be_valid
      end
    end

    context 'when question has user_answer' do
      it 'is valid' do
        answer = build(:free_text_answer, options: [], user_answer: 'something')
        expect(answer).to be_valid
      end
    end
  end

  describe '#minimum_one_option' do
    context 'when there are no options' do
      it 'is not valid' do
        answer = build(:answer)
        answer.valid?
        expect(answer.errors.full_messages).to include('Options Should have at least one option.')
      end
    end

    context 'when there are options' do
      it 'is valid' do
        answer = create(:answer_with_option)
        expect(answer).to be_valid
      end
    end
  end

  describe '#maximum_one_option' do
    context 'when question is single choice' do
      it 'onlies have one option' do
        option1 = build(:option)
        option2 = build(:option)
        answer = build(:answer, options: [option1, option2])
        answer.valid?
        expect(answer.errors.full_messages).to include("Question Can't select more than one option when single choice.")
      end
    end

    context 'when answer have only one option' do
      it 'is valid' do
        option1 = build(:option)
        answer = build(:answer_with_option, options: [option1])
        expect(answer).to be_valid
      end
    end
  end
end
