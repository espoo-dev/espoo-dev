require 'rails_helper'

RSpec.describe 'SurveysController', type: :request do
  describe '#show' do
    let(:answers_survey) { create(:answers_survey_with_some_answers) }
    let!(:survey) { answers_survey.survey }
    let!(:first_survey_question) { survey.questions.first }
    let!(:last_survey_question) { survey.questions.last }
    let!(:first_question_type) { first_survey_question.question_type }
    let!(:last_question_type) { last_survey_question.question_type }
    let!(:survey_subject) { survey.survey_subject }
    let!(:option) { create(:option, question: first_survey_question) }

    before { get api_v1_survey_path(survey), headers: auth_headers(user: answers_survey.user) }

    it { expect(response).to have_http_status :ok }

    it 'matches surveys attributes' do
      expected_attributes = {
        'survey' => {
          'id' => anything,
          'name' => survey.name,
          'description' => survey.description,
          'survey_subject_id' => survey_subject.id,
          'questions' => [
            { 'id' => first_survey_question.id,
              'name' => first_survey_question.name,
              'question_type' => {
                'id' => first_question_type.id,
                'name' => first_question_type.name
              },
              'options' => [{
                'id' => option.id,
                'name' => option.name,
                'correct' => option.correct
              }] },
            'id' => last_survey_question.id,
            'name' => last_survey_question.name,
            'question_type' => {
              'id' => last_question_type.id,
              'name' => last_question_type.name
            },
            'options' => []
          ]
        },
        'answered_questions_quantity' => 1
      }

      expect(response_body).to match(expected_attributes)
    end
  end

  describe '#index' do
    describe 'when user is admin' do
      context 'when many surveys exist' do
        before do
          create_list(:ready_survey, 3)
          get api_v1_surveys_path, headers: auth_headers
        end

        it { expect(response).to have_http_status :success }

        it { expect(response_body.count).to eq(3) }
      end

      context "when surveys don't exist" do
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
          create(:ready_survey, name: 'test 1', user_id: user.id)
          create(:ready_survey, name: 'test 2', user_id: user.id)
          another_user = create(:user)
          create(:ready_survey, name: 'test 1', user_id: another_user.id)
          get api_v1_surveys_path(user_id: another_user.id), headers: auth_headers
        end

        it { expect(response).to have_http_status :success }
        it { expect(response_body.count).to eq(1) }
      end
    end

    describe 'when user is student' do
      context 'when many surveys from users with different roles exist' do
        before do
          create(:ready_survey, user: create(:user_admin))
          create(:ready_survey, user: create(:user_teacher))
          get api_v1_surveys_path, headers: auth_headers(user: create(:user_student))
        end

        it { expect(response).to have_http_status :success }

        it { expect(response_body.count).to eq(2) }
      end
    end
  end
end
