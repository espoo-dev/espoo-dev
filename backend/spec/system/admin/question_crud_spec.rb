require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }
    let!(:survey_admin) { create(:survey_with_1_question, user: user_admin) }
    let!(:survey_teacher) { create(:survey_with_1_question, user: user_teacher) }
    let!(:option_admin) { create(:option, user: user_admin) }
    let!(:option_teacher) { create(:option, user: user_teacher) }
    let!(:question_admin) { create(:question, user: user_admin, survey: survey_admin) }
    let!(:question_teacher) { create(:question, user: user_teacher, survey: survey_teacher) }
    let!(:question_type) { create(:question_type) }

    describe 'user admin' do
      before do
        sign_in user_admin
      end

      context 'when create' do
        before do
          visit new_admin_question_path

          find('label', text: 'Question type').click
          find('.option', text: question_type.name).click
        end

        it 'expect to show admin and teacher surveys' do
          find('label', text: 'Survey').click
          expect(page).to have_selector('.option', text: survey_admin.name && survey_teacher.name)
        end

        it 'expect to show admin and teacher options' do
          find('label', text: 'Option').click
          expect(page).to have_selector('.option', text: option_admin.name && option_teacher.name)
        end

        it 'shows user select when admin' do
          expect(page).to have_selector('label', text: 'User')
        end

        it 'creates the question for admin' do
          find('label', text: 'User').click
          find('.option', text: user_admin.email).click

          fill_in 'Name', with: 'question name'

          click_button 'Create Question'
          expect(page).to have_content 'Question was successfully created.'
        end

        it 'creates the question for user' do
          find('label', text: 'User').click
          find('.option', text: user_teacher.email).click

          fill_in 'Name', with: 'question name'

          click_button 'Create Question'
          expect(page).to have_content 'Question was successfully created.'
        end
      end

      describe 'index' do
        before do
          visit admin_questions_path
        end

        it 'list the questions without id' do
          expect(page).not_to have_text(question_admin.id && question_teacher.id)
        end

        it 'list all the questions when admin is logged in' do
          expect(page).to have_text(question_admin.name && question_teacher.name)
        end

        it 'list all questions with surveys names' do
          expect(page).to have_text(survey_admin.name && survey_teacher.name)
        end
      end

      describe 'delete' do
        before do
          visit admin_questions_path

          first(:link, 'Destroy').click

          page.accept_alert
        end

        it { expect(page).to have_text('Question was successfully destroyed.') }
      end
    end

    describe 'user teacher' do
      let!(:question) { create(:question, user: user_teacher) }
      let!(:option) { create(:option, question: question) }

      before do
        sign_in user_teacher
      end

      describe 'when show' do
        before do
          visit admin_question_path(question)
        end

        it 'shows the options that belongs to question' do
          expect(page).to have_text(option.name)
        end
      end

      describe 'when create' do
        before do
          visit new_admin_question_path

          find('label', text: 'Question type').click
          find('.option', text: question_type.name).click

          fill_in 'Name', with: 'question name'
        end

        it 'shows only teacher surveys' do
          find('label', text: 'Survey').click
          expect(page).not_to have_selector('.option', text: survey_admin.name)
        end

        it 'does not show admin options' do
          find('label', text: 'Option').click
          expect(page).not_to have_selector('.option', text: option_admin.name)
        end

        it 'shows only teacher options' do
          find('label', text: 'Option').click
          expect(page).to have_selector('.option', text: option_teacher.name)
        end

        it 'does not show user select when not admin' do
          expect(page).not_to have_selector('label', text: 'User')
        end

        it 'creates the question' do
          click_button 'Create Question'
          expect(page).to have_content 'Question was successfully created.'
        end
      end

      describe 'when index' do
        before do
          visit admin_questions_path
        end

        it 'list the questions without id' do
          expect(page).not_to have_text([question_admin.id, question_teacher.id])
        end

        it 'when logged in as teacher list only questions of teacher' do
          expect(page).not_to have_text([question_admin.name, question_teacher.name])
        end
      end

      context 'when destroy' do
        before do
          visit admin_questions_path

          first(:link, 'Destroy').click

          page.accept_alert
        end

        it { expect(page).to have_text('Question was successfully destroyed.') }
      end
    end
  end
end
