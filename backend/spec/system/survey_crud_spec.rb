require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }

    describe 'when user is admin' do
      before do
        sign_in user_admin
      end

      describe 'create' do
        it 'creates the survey' do
          visit '/admin/surveys/new'

          find('label', text: 'User').click
          find('.option', text: user_admin.email).click

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

    describe 'when user is not admin' do
      let!(:survey1) { create(:survey, user: user_teacher) }
      let!(:survey2) { create(:survey) }

      before do
        sign_in user_teacher
      end

      describe 'list' do
        before do
          visit '/admin/surveys'
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
          visit "/admin/surveys/#{survey1.id}"

          expect(page).to have_text(survey1.name)
        end

        it "can't see surveys that not belongs to him" do
          visit "/admin/surveys/#{survey2.id}"

          expect(page).to have_text("The page you were looking for doesn't exist.")
        end
      end
    end
  end
end
