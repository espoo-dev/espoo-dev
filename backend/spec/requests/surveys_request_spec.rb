require 'rails_helper'

RSpec.describe 'SurveysController', type: :request do
  describe '#show' do
    let!(:survey) { create(:survey) }
    let!(:survey_question) { survey.questions.first }
    let!(:question_type) { survey_question.question_type }

    before { get api_v1_survey_path(survey.id), headers: auth_headers }

    it { expect(response).to have_http_status :ok }

    it 'matches surveys attributes' do
      expected_attributes = {
        'id' => anything,
        'name' => survey.name,
        'description' => survey.description,
        'questions' => [
          'id' => survey_question.id,
          'name' => survey_question.name,
          'question_type' => {
            'id' => question_type.id,
            'name' => question_type.name
          }
        ]
      }
      expect(response_body).to match(expected_attributes)
    end
  end

  describe '#index' do
    context 'when can list all surveys' do
      before do
        create_list(:survey, 3)
        get api_v1_surveys_path, headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response_body.count).to eq(3) }
    end

    context "when survey doesn't exist" do
      before do
        get api_v1_surveys_path, headers: auth_headers
      end

      it { expect(response).to have_http_status :success }
      it { expect(response_body).to match([]) }
      it { expect(response_body.count).to eq(0) }
    end

    context 'when list surveys by user id' do
      before do
        user = create(:user)
        create(:survey, name: 'test 1', user_id: user.id)
        create(:survey, name: 'test 2', user_id: user.id)
        another_user = create(:user)
        create(:survey, name: 'test 1', user_id: another_user.id)
        get api_v1_surveys_path << "?user_id=#{another_user.id}", headers: auth_headers
      end

      it { expect(response).to have_http_status :success }
      it { expect(response_body.count).to eq(1) }
    end
  end
end
