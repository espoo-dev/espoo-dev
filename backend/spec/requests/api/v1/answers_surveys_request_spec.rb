require 'rails_helper'

RSpec.describe 'AnswersSurveysController', type: :request do
  let!(:user) { create(:user) }

  describe '#create' do
    context 'when data is valid' do
      let!(:survey) { create(:survey_with_1_question) }
      let!(:survey_question) { survey.questions.first }
      let!(:question_type) { survey_question.question_type }
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
        question_attributes = {
          'id' => survey_question.id,
          'name' => survey_question.name,
          'image_url' => survey_question.image_url,
          'question_type' => {
            'id' => question_type.id,
            'name' => question_type.name
          },
          'options' => [{
            'id' => option.id,
            'name' => option.name,
            'correct' => option.correct
          }]
        }
        expected_attributes = {
          'id' => anything,
          'status' => AnswersSurvey::NOT_STARTED,
          'answered_questions' => [],
          'not_answered_questions' => [question_attributes],
          'questions' => [question_attributes],
          'current_question_index' => 0,
          'user_id' => user.id
        }
        expect(response_body).to match(expected_attributes)
      end
    end
  end

  describe '#show' do
    context 'when answers_survey exists' do
      let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user) }

      before { get api_v1_answers_survey_path(answers_survey), headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it 'matches AnswersSurvey attributes' do
        expected_attributes = answers_survey_with_questions_hash(answers_survey)
        expect(response_body).to match(expected_attributes)
      end
    end
  end
end
