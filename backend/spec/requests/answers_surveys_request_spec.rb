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
      let!(:survey) { answers_survey.survey }
      let!(:survey_question) { survey.questions.first }
      let!(:survey_question2) { survey.questions.second }
      let!(:option) { survey_question.options.first }
      let!(:option3) { survey_question.options.second }
      let!(:option2) { survey_question2.options.first }
      let!(:question_type) { survey_question.question_type }
      let(:answered_question_attributes) do
        {
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
          }, {
            'id' => option3.id,
            'name' => option3.name,
            'correct' => option3.correct
          }],
          'answered_options' => [{
            'id' => option3.id,
            'name' => option3.name,
            'correct' => option3.correct
          }]
        }
      end
      let(:unanswered_question_attributes) do
        {
          'id' => survey_question2.id,
          'name' => survey_question2.name,
          'question_type' => {
            'id' => question_type.id,
            'name' => question_type.name
          },
          'options' => [{
            'id' => option2.id,
            'name' => option2.name,
            'correct' => option2.correct
          }],
          'answered_options' => []
        }
      end
      let(:questions_attributes) do
        [
          answered_question_attributes,
          unanswered_question_attributes
        ]
      end
      let(:answers_surveys_attributes) do
        [
          {
            'id' => answers_survey.id,
            'user_id' => answers_survey.user.id,
            'status' => answers_survey.status,
            'questions' => question_attributes,
            'answered_questions' => [answered_question_attributes],
            'not_answered_questions' => [unanswered_question_attributes],
            'current_question_index' => 1
          }
        ]
      end
      let(:current_answers_survey_attributes) { answers_surveys_attributes.first }

      before { get api_v1_answers_survey_path(answers_survey), headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it 'matches AnswersSurvey attributes' do
        expected_attributes = {
          'id' => answers_survey.id,
          'user_id' => answers_survey.user.id,
          'status' => answers_survey.status,
          'questions' => questions_attributes,
          'answered_questions' => [answered_question_attributes],
          'not_answered_questions' => [unanswered_question_attributes],
          'current_question_index' => 1
        }

        expect(response_body).to match(expected_attributes)
      end
    end
  end
end
