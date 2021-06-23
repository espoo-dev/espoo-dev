require 'rails_helper'

RSpec.describe 'AnswersSurveysController', type: :request do
  let!(:user) { create(:user) }
  let!(:survey) { create(:survey) }

  describe '#index' do
    context 'when can list all ready surveys' do
      before do
        create_list(:answers_survey, 3, user: user)
        get api_v1_answers_surveys_path, headers: auth_headers(user: user)
      end

      it { expect(response).to have_http_status :success }

      it { expect(response_body.count).to eq(3) }
    end
  end

  describe '#create' do
    context 'when data is valid' do
      before do
        answers_survey_params = {
          survey_id: survey.id
        }
        post api_v1_answers_surveys_path, params: answers_survey_params, headers: auth_headers(user: user)
      end

      it { expect(response).to have_http_status :created }

      it { expect(AnswersSurvey.count).to eq(1) }

      it 'matches AnswersSurvey attributes' do
        expected_attributes = {
          'id' => anything,
          'survey_id' => survey.id,
          'user_id' => user.id
        }
        expect(response_body).to match(expected_attributes)
      end
    end
  end
end
