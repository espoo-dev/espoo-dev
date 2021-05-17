require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }
    let!(:question_admin) { create(:question, user: user_admin) }
    let!(:question_teacher) { create(:question, user: user_teacher) }
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

          find('label', text: 'User').click
          find('.option', text: user_admin.email).click

          fill_in 'Name', with: 'question name'

          click_button 'Create Question'
        end

        it 'creates the question' do
          expect(page).to have_content 'Question was successfully created.'
        end
      end

      describe 'index' do
        before do
          visit admin_questions_path
        end

        it 'list the questions without id' do
          expect(page).not_to have_text(question_admin.id)
          expect(page).not_to have_text(question_teacher.id)
        end

        it 'list all the questions when admin is logged in' do
          expect(page).to have_text(question_admin.name)
          expect(page).to have_text(question_teacher.name)
        end

        it 'list all questions with surveys names' do
          expect(page).to have_text(question_admin.survey.name)
          expect(page).to have_text(question_teacher.survey.name)
        end
      end

      describe 'delete' do
        before do
          visit admin_questions_path

          first(:link, 'Destroy').click

          page.accept_alert
        end

        it 'deletes the question' do
          expect(page).to have_text('Question was successfully destroyed.')
        end
      end
    end

    describe 'user teacher' do
      before do
        sign_in user_teacher
      end

      describe 'create' do
        before do
          visit new_admin_question_path

          find('label', text: 'Question type').click
          find('.option', text: question_type.name).click

          find('label', text: 'User').click
          find('.option', text: user_teacher.email).click

          fill_in 'Name', with: 'question name'

          click_button 'Create Question'
        end

        it 'creates the question' do
          expect(page).to have_content 'Question was successfully created.'
        end
      end

      describe 'index' do
        before do
          visit admin_questions_path
        end

        it 'list the questions without id' do
          expect(page).not_to have_text(question_admin.id)
          expect(page).not_to have_text(question_teacher.id)
        end

        it 'when logged in as teacher list only questions of teacher' do
          expect(page).not_to have_text(question_admin.name)
          expect(page).to have_text(question_teacher.name)
        end
      end

      context 'when delete' do
        before do
          visit admin_questions_path

          click_on 'Destroy'

          page.accept_alert
        end

        it 'deletes the question' do
          expect(page).to have_text('Question was successfully destroyed.')
        end
      end
    end
  end
end
