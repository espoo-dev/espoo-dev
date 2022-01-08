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

  describe '#unique_not_completed_by_survey' do
    let(:user) { create(:user) }
    let(:survey) { create(:survey_with_1_question) }

    describe 'when answers_survey is unique "not completed" by survey' do
      let(:answers_survey) { create(:answers_survey) }

      it 'is valid' do
        expect(answers_survey).to be_valid
      end
    end

    describe 'when answers_survey is not unique "not completed" by survey' do
      let(:answers_survey1) { create(:answers_survey, user: user, survey: survey) }
      let(:answers_survey2) { build(:answers_survey, user: user, survey: survey) }

      it 'is not valid' do
        answers_survey1
        expect(answers_survey2).not_to be_valid
      end

      it 'is has multiple_not_completed_answers_survey error' do
        answers_survey1
        answers_survey2.valid?
        expect(answers_survey2.errors.full_messages).to match(['Should exist only one not completed by survey and user.'])
      end
    end
  end
end
