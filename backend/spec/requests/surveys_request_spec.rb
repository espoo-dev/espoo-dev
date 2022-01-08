require 'rails_helper'

RSpec.describe 'SurveysController', type: :request do
  describe '#show' do
    let!(:user_student) { create(:user_student) }
    let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user_student) }
    let!(:survey) { answers_survey.survey }
    let!(:survey_subject) { survey.survey_subject }
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
        }]
      }
    end
    let(:question_attributes) do
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

    before { get api_v1_survey_path(survey), headers: auth_headers(user: user_student) }

    it { expect(response).to have_http_status :ok }

    it 'matches surveys attributes' do
      expected_attributes = {
        'id' => anything,
        'name' => survey.name,
        'description' => survey.description,
        'survey_subject_id' => survey_subject.id,
        'answered_questions_quantity' => 1,
        'total_questions_quantity' => 2,
        'questions' => question_attributes,
        'answers_surveys' => answers_surveys_attributes,
        'current_answers_survey' => current_answers_survey_attributes
      }

      expect(response_body).to match(expected_attributes)
    end
  end

  describe '#index' do
    describe 'when user is admin' do
      context 'when it has an answers survey' do
        let!(:user_student) { create(:user_student) }
        let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user_student) }
        let!(:survey) { answers_survey.survey }
        let!(:survey_subject) { survey.survey_subject }
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
            }]
          }
        end
        let(:question_attributes) do
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

        before { get api_v1_surveys_path, headers: auth_headers(user: user_student) }

        it { expect(response).to have_http_status :ok }

        it 'matches surveys attributes' do
          expected_attributes = [{
            'id' => anything,
            'name' => survey.name,
            'description' => survey.description,
            'survey_subject_id' => survey_subject.id,
            'answered_questions_quantity' => 1,
            'total_questions_quantity' => 2,
            'questions' => question_attributes,
            'answers_surveys' => answers_surveys_attributes,
            'current_answers_survey' => current_answers_survey_attributes
          }]

          expect(response_body).to match(expected_attributes)
        end
      end

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
          get api_v1_surveys_path, headers: auth_headers
        end

        it { expect(response).to have_http_status :success }
        it { expect(response_body.count).to eq(3) }
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
