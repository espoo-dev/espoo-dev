require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }
    let!(:survey) { create(:survey) }

    describe 'when user is admin' do
      before do
        sign_in user_admin
      end

      describe 'create' do
        before do
          visit new_admin_survey_path
          find('label', text: 'User').click
        end

        it 'creates the survey for admin' do
          find('.option', text: user_admin.email).click

          click_button 'Create Survey'
          expect(page).to have_content 'Survey was successfully created.'
        end

        it 'creates the survey for teacher' do
          find('.option', text: user_teacher.email).click

          click_button 'Create Survey'
          expect(page).to have_content 'Survey was successfully created.'
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

          click_on 'Destroy'
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
      let!(:survey1) { create(:survey, user: user_teacher) }
      let!(:survey2) { create(:survey) }

      before do
        sign_in user_teacher
      end

      describe 'create' do
        before do
          visit new_admin_survey_path

          click_button 'Create Survey'
        end

        it { expect(page).to have_content 'Survey was successfully created.' }
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
