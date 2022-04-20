require 'rails_helper'

RSpec.describe 'AnswersOption CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_admin) { create(:user_admin) }
    let!(:user_teacher) { create(:user_teacher) }
    let!(:user_student) { create(:user_student) }

    let!(:teacher_survey) { create(:ready_survey, user: user_teacher) }
    let!(:admin_survey) { create(:ready_survey, user: user_admin) }

    let!(:answer_survey_teacher_survey) { create(:answers_survey, survey: teacher_survey, user: user_student) }
    let!(:answer_survey_admin_survey) { create(:answers_survey, survey: admin_survey, user: user_student) }

    let!(:teacher_question) { teacher_survey.questions.first }
    let!(:admin_question) { admin_survey.questions.first }

    let!(:answers_option_teacher_survey) { create(:answer_with_option, question: teacher_question, answers_survey: answer_survey_teacher_survey).answers_options }
    let!(:answers_option_admin_survey) { create(:answer_with_option, question: admin_question, answers_survey: answer_survey_admin_survey).answers_options }

    describe '#index' do
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

        it 'sees all answers_options names that belongs to teacher' do
          AnswersOption.by_user(user_teacher).each do |answers_option|
            expect(page).to have_content answers_option.option.name
          end
        end

        it 'does not see answers_options names that belongs to other users' do
          users = User.where.not(id: user_teacher)
          answers_options = users.map { |user| AnswersOption.by_user(user) }.flatten

          answers_options.each do |answers_option|
            expect(page).not_to have_content answers_option.option.name
          end
        end
      end
    end

    describe '#show' do
      context 'when admin' do
        before do
          sign_in user_admin
        end

        it 'sees his own answers option' do
          visit admin_answers_option_path(answers_option_admin_survey.last)
          expect(page).to have_content("Show AnswersOption ##{answers_option_admin_survey.last.id}")
        end

        it 'sees teacher answers option' do
          visit admin_answers_option_path(answers_option_teacher_survey.last)
          expect(page).to have_content("Show AnswersOption ##{answers_option_teacher_survey.last.id}")
        end
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
