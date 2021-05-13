require 'rails_helper'

RSpec.describe 'question_type CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question_type) { create(:question_type) }
    let!(:admin_user) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }

    describe 'when user is admin' do
      before do
        sign_in admin_user
      end

      it 'list question_type' do
        visit '/admin/question_types/'

        expect(page).to have_text(question_type.name)
      end

      it 'Delete question_type' do
        visit '/admin/question_types'

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_text('Question type was successfully destroyed.')
      end
    end

    describe 'when user is not admin' do
      before do
        sign_in user_teacher
      end

      it 'can show question_type' do
        visit "/admin/question_types/#{question_type.id}"

        expect(page).to have_text(question_type.name)
        expect(page).not_to have_text(question_type.id)
      end

      it 'can list question_type' do
        visit '/admin/question_types/'

        expect(page).to have_text(question_type.name)
      end

      it 'cannot delete question_type' do
        visit '/admin/question_types'

        expect(page).not_to have_text('Destroy')
      end
    end
  end
end
