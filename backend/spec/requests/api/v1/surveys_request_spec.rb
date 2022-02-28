require 'rails_helper'

RSpec.describe 'SurveysController', type: :request do
  describe '#show' do
    let!(:user_student) { create(:user_student) }
    let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user_student) }
    let!(:survey) { answers_survey.survey }

    before { get api_v1_survey_path(survey), headers: auth_headers(user: user_student) }

    it { expect(response).to have_http_status :ok }

    it 'matches surveys attributes' do
      expected_attributes = survey_hash(survey, answers_survey)

      expect(response_body).to match(expected_attributes)
    end
  end

  describe '#index' do
    describe 'when user is admin' do
      context 'when it has an answers survey' do
        let!(:user_student) { create(:user_student) }
        let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user_student) }
        let!(:survey) { answers_survey.survey }

        before { get api_v1_surveys_path, headers: auth_headers(user: user_student) }

        it { expect(response).to have_http_status :ok }

        it 'matches surveys attributes' do
          expected_attributes = [survey_hash(survey, answers_survey)]

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

    describe 'surveys to be sorted by AnswersSurvey status' do
      let(:user_student) { create(:user_student) }

      let(:answer_survey_one) { create(:answers_survey, user: user_student, survey: create(:ready_survey)) }
      let!(:not_started_survey) { answer_survey_one.survey }

      let!(:without_answer_survey_survey) { create(:ready_survey) }

      let(:answers_survey_two) { create(:answers_survey_with_some_answers, user: user_student) }
      let!(:started_survey) { answers_survey_two.survey }

      let(:answers_survey_three) { create(:answers_survey_with_all_answers, user: user_student) }
      let!(:completed_survey) { answers_survey_three.survey }

      before do
        get api_v1_surveys_path, headers: auth_headers(user: user_student)
      end

      it 'expect surveys to be ordered' do
        sorted_surveys = [
          present_survey(not_started_survey),
          present_survey(without_answer_survey_survey),
          present_survey(started_survey),
          present_survey(completed_survey)
        ]

        expect(response_body).to match(sorted_surveys)
      end
    end
  end
end
