require 'rails_helper'

RSpec.describe 'AnswersSurveyController', type: :request do
  let(:user_student) { create(:user_student) }
  let(:survey) { create(:survey_with_2_questions) }
  let(:answers_survey_params) { { survey_id: survey.id } }

  describe '#create' do
    subject(:call) { post answers_surveys_path, params: answers_survey_params, headers: auth_headers(user: user_student) }

    it 'response status' do
      call
      expect(response).to have_http_status :found
    end

    context 'when there is no AnswerSurvey' do
      it { expect { call }.to change(AnswersSurvey, :count).from(0).to(1) }
    end

    context 'when there is a non completed AnswerSurvey' do
      before do
        create(:answers_survey_with_some_answers, survey_id: survey.id, user_id: user_student.id)
      end

      it { expect { call }.not_to change(AnswersSurvey, :count) }
    end

    context 'when there is a completed AnswerSurvey' do
      before do
        create(:answers_survey_with_all_answers, survey_id: survey.id, user_id: user_student.id)
      end

      it { expect { call }.to change(AnswersSurvey, :count).from(1).to(2) }
    end
  end
end
