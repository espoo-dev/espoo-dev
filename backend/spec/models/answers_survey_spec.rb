require 'rails_helper'

RSpec.describe AnswersSurvey, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:survey).required }
    it { is_expected.to have_many(:answers).dependent(:destroy) }
  end

  describe '#status' do
    describe 'when has no answers' do
      let(:answer_survey) { create(:answers_survey, answers: []) }

      it 'has status NOT_STARTED' do
        expect(answer_survey.status).to eq(AnswersSurvey::NOT_STARTED)
      end
    end

    describe 'when has some answers' do
      let(:answer_survey) { create(:answers_survey_with_some_answers) }

      it 'has status STARTED' do
        expect(answer_survey.status).to eq(AnswersSurvey::STARTED)
      end
    end

    describe 'when has all answers' do
      let(:answer_survey) { create(:answers_survey_with_all_answers) }

      it 'has status COMPLETED' do
        expect(answer_survey.status).to eq(AnswersSurvey::COMPLETED)
      end
    end
  end
end
