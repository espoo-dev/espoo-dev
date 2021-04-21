require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'create' do
      it 'creates the survey' do
        visit '/admin/surveys/new'

        find('label', text: 'User').click
        find('.option', text: user.email).click

        click_button 'Create Survey'
        expect(page).to have_content 'Survey was successfully created.'
      end
    end

    describe 'list' do
      it 'list the surveys' do
        survey = create(:survey)

        visit '/admin/surveys'

        expect(page).to have_text(survey.name)
      end
    end

    describe 'delete' do
      it 'deletes the survey' do
        create(:survey)

        visit '/admin/surveys'

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_text('Survey was successfully destroyed.')
      end
    end
  end
end
