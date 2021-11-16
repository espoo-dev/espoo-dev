require 'rails_helper'

RSpec.describe 'AnswersSurveysController', type: :request do
  let!(:user) { create(:user) }

  describe '#create' do
    context 'when data is valid' do
      let!(:survey) { create(:survey) }
      let!(:survey_question) { survey.questions.first }
      let!(:question_type) { survey_question.question_type }
      let!(:survey_subject) { survey.survey_subject }
      let!(:option) { create(:option, question: survey_question) }

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
          'status' => AnswersSurvey::NOT_STARTED,
          'survey' => {
            'id' => anything,
            'name' => survey.name,
            'description' => survey.description,
            'survey_subject_id' => survey_subject.id,
            'answers_surveys' => [],
            'current_answers_survey' => nil,
            'questions' => [
              'id' => survey_question.id,
              'name' => survey_question.name,
              'question_type' => {
                'id' => question_type.id,
                'name' => question_type.name
              },
              'options' => [{
                'id' => option.id,
                'name' => option.name,
                'correct' => option.correct
              }]
            ]
          },
          'user_id' => user.id
        }
        expect(response_body).to match(expected_attributes)
      end
    end
  end
end
