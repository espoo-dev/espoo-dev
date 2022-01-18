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
  end
end
