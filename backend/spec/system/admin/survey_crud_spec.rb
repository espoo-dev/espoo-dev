require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }
    let!(:survey) { create(:survey_with_1_question) }
    let!(:question_admin) { create(:question, user: user_admin) }
    let!(:question_teacher) { create(:question, user: user_teacher) }
    let!(:survey_subject) { create(:survey_subject) }

    describe 'when user is admin' do
      before do
        sign_in user_admin
      end

      describe 'create' do
        before do
          visit new_admin_survey_path
        end

        it 'creates the survey for admin' do
          find('label', text: 'User').click
          find('.option', text: user_admin.email).click
          find('label', text: 'Survey subject').click
          find('.option', text: survey_subject.name).click

          click_button 'Create Survey'
          expect(page).to have_content 'Survey was successfully created.'
        end

        it 'creates the survey for teacher' do
          find('label', text: 'User').click
          find('.option', text: user_teacher.email).click
          find('label', text: 'Survey subject').click
          find('.option', text: survey_subject.name).click

          click_button 'Create Survey'
          expect(page).to have_content 'Survey was successfully created.'
        end

        it 'can select questions that belongs to all users' do
          find('label', text: 'Questions').click
          expect(page).to have_selector('.option', text: question_admin.name && question_teacher.name)
        end
      end

      describe 'list' do
        before do
          visit admin_surveys_path
        end

        it { expect(page).to have_text(survey.name) }
      end

      describe 'delete' do
        before do
          visit admin_surveys_path

          first(:link, 'Destroy').click
          page.accept_alert
        end

        it { expect(page).to have_text('Survey was successfully destroyed.') }
      end

      describe 'edit' do
        before do
          visit edit_admin_survey_path(survey)
        end

        it { expect(page).to have_selector '#survey_user_id', visible: :hidden }
      end
    end

    describe 'when user is not admin' do
      let!(:survey1) { create(:survey_with_1_question, user: user_teacher) }
      let!(:survey2) { create(:survey_with_1_question) }

      before do
        sign_in user_teacher
      end

      describe 'create' do
        before do
          visit new_admin_survey_path
        end

        it 'creates survey' do
          find('label', text: 'Survey subject').click
          find('.option', text: survey_subject.name).click

          click_button 'Create Survey'
          expect(page).to have_content 'Survey was successfully created.'
        end

        it 'can select questions that belongs to himself' do
          find('label', text: 'Questions').click
          expect(page).to have_selector('.option', text: question_teacher.name)
        end

        it 'cannot select questions that NOT belongs to himself' do
          find('label', text: 'Questions').click
          expect(page).not_to have_selector('.option', text: question_admin.name)
        end
      end

      describe 'list' do
        before do
          visit admin_surveys_path
        end

        it 'see surveys that belongs to him' do
          expect(page).to have_text(survey1.name)
        end

        it 'does not see surveys that not belongs to him' do
          expect(page).not_to have_text(survey2.name)
        end
      end

      describe 'show' do
        it 'can see his own survey' do
          visit admin_survey_path(survey1)

          expect(page).to have_text(survey1.name)
        end

        it "can't see surveys that not belongs to him" do
          visit admin_survey_path(survey2)

          expect(page).to have_text("The page you were looking for doesn't exist.")
        end
      end

      describe 'edit' do
        before do
          visit edit_admin_survey_path(survey1)
        end

        it "can't edit user" do
          expect(page).not_to have_selector '#survey_user_id', visible: :hidden
        end
      end
    end
  end
end
