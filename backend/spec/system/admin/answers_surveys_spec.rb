require 'rails_helper'

RSpec.describe 'AnswersSurvey CRUD', type: :system do
  describe 'CRUD' do
    let(:user_admin) { create(:user_admin) }
    let(:user_teacher) { create(:user_teacher) }
    let(:teacher_survey) { create(:ready_survey, user: user_teacher) }
    let(:admin_survey) { create(:ready_survey, user: user_admin) }
    let(:student) { create(:user_student) }
    let!(:answer_survey_teacher_survey) { create(:answers_survey, survey_id: teacher_survey.id, user_id: student.id) }
    let!(:answer_survey_admin_survey) { create(:answers_survey, survey_id: admin_survey.id, user_id: student.id) }

    describe 'index' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_answers_surveys_path
        end

        it 'sees all surveys' do
          AnswersSurvey.all.each do |answer_survey|
            expect(page).to have_content answer_survey.survey.name
          end
        end
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_answers_surveys_path
        end

        it { expect(page).to have_content answer_survey_teacher_survey.survey.name }
        it { expect(page).not_to have_content answer_survey_admin_survey.survey.name }
      end
    end

    describe 'show' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_answers_survey_path(answer_survey_teacher_survey)
        end

        it { expect(page).to have_content("AnswersSurvey ##{answer_survey_teacher_survey.id}") }
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_answers_survey_path(answer_survey_teacher_survey)
        end

        it { expect(page).to have_content("AnswersSurvey ##{answer_survey_teacher_survey.id}") }
      end
    end
  end
end
