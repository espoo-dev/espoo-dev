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
end
