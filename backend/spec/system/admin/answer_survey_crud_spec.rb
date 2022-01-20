require 'rails_helper'

RSpec.describe 'AnswerSurvey CRUD', type: :system do
  describe 'CRUD' do
    describe 'when list' do
      before do
        create(:survey)
        sign_in create(:user)
        create(:answers_survey)
        visit admin_answers_surveys_path
      end

      it { expect(page).to have_content 'Answers Surveys' }
    end

    describe 'when create' do
      before do
        survey = create(:survey)
        user = create(:user)
        sign_in user
        visit new_admin_answers_survey_path

        find('label', text: 'User').click
        find('.option', text: user.email).click
        find('label', text: 'Survey').click
        find('.option', text: survey.name).click
        click_button 'Create Answers survey'
      end

      it { expect(page).to have_content 'Answers survey was successfully created.' }
    end

    describe 'when update' do
      before do
        survey = create(:survey)
        user1 = create(:user)
        user2 = create(:user)
        sign_in user1
        answers_survey = create(:answers_survey, user: user1, survey: survey)
        visit edit_admin_answers_survey_path(answers_survey)

        find('label', text: 'User').click
        find('.option', text: user2.email).click

        click_button 'Update Answers survey'
      end

      it { expect(page).to have_content 'Answers survey was successfully updated.' }
    end

    describe 'when destroy' do
      before do
        sign_in create(:user)
        create(:survey)
        create(:answers_survey)

        visit admin_answers_surveys_path
        first(:link, 'Destroy').click
        page.accept_alert
      end

      it { expect(page).to have_content 'Answers survey was successfully destroyed.' }
    end
  end
end
