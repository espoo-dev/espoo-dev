require 'rails_helper'

RSpec.describe 'AnswersOption CRUD', type: :system do
  describe 'CRUD' do
    let(:user_admin) { create(:user_admin) }
    let(:user_teacher) { create(:user_teacher) }
    let(:teacher_survey) { create(:ready_survey, user: user_teacher) }
    let(:admin_survey) { create(:ready_survey, user: user_admin) }
    let(:student) { create(:user_student) }
    let(:answer_survey_teacher_survey) { create(:answers_survey, survey_id: teacher_survey.id, user_id: student.id) }
    let(:answer_survey_admin_survey) { create(:answers_survey, survey_id: admin_survey.id, user_id: student.id) }
    let!(:answers_option_teacher_survey) { create(:answer_with_option, answers_survey: answer_survey_teacher_survey).answers_options }
    let!(:answers_option_admin_survey) { create(:answer_with_option, answers_survey: answer_survey_admin_survey).answers_options }

    describe 'index' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_answers_options_path
        end

        it 'sees all answers_options names' do
          AnswersOption.all.each do |answers_option|
            expect(page).to have_content answers_option.option.name
          end
        end
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_answers_options_path
        end

        it { expect(page).to have_content answers_option_teacher_survey.last.option.name }

        it { expect(page).not_to have_content answers_option_admin_survey.last.option.name }
      end
    end

    describe 'show' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_answers_option_path(answers_option_teacher_survey.last)
        end

        it { expect(page).to have_content("Show AnswersOption ##{answers_option_teacher_survey.last.id}") }
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_answers_option_path(answers_option_teacher_survey.last)
        end

        it { expect(page).to have_content("Show AnswersOption ##{answers_option_teacher_survey.last.id}") }
      end
    end
  end
end
