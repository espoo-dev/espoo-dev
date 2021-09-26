require 'rails_helper'

RSpec.describe Answer, type: :model do
  subject { create(:answer) }

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
    it 'is not valid when has no user_answer' do
      answer = build(:free_text_answer, options: [], user_answer: nil)
      expect(answer).not_to be_valid
    end

    it 'is valid when question has user_answer' do
      answer = build(:free_text_answer, options: [], user_answer: 'something')
      expect(answer).to be_valid
    end
  end
end
