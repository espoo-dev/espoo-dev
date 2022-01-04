require 'rails_helper'

RSpec.describe 'SurveySubject CRUD', type: :system do
  describe 'CRUD' do
    before do
      create(:survey_with_1_question)
      sign_in create(:user)
      visit admin_survey_subjects_path
    end

    describe 'when list' do
      it { expect(page).to have_content 'Survey Subjects' }
    end

    describe 'when destroy' do
      before do
        click_on 'Destroy'
        page.accept_alert
      end

      it { expect(page).to have_content "Can't destroy survey subject with 1 surveys." }
    end

    describe 'when create' do
      before do
        click_on 'New survey subject'
        fill_in 'Name', with: 'test subject'
        fill_in 'Description', with: 'test Description'
        click_button 'Create Survey subject'
      end

      it { expect(page).to have_text('Survey subject was successfully created.') }
    end

    describe 'when edit' do
      before do
        subject = create(:survey_subject)
        visit edit_admin_survey_subject_path(subject)
        click_button 'Update Survey subject'
      end

      it { expect(page).to have_text('Survey subject was successfully updated.') }
    end
  end
end
