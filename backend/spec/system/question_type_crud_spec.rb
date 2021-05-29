require 'rails_helper'

RSpec.describe 'question_type CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question_type) { create(:question_type) }
    let!(:admin_user) { create(:user) }

    describe 'when user is admin' do
      before do
        sign_in admin_user
        visit admin_question_types_path
      end

      it { expect(page).to have_text(question_type.name) }

      describe 'when delete' do
        before do
          click_on 'Destroy'
          page.accept_alert
        end

        it { expect(page).to have_text('Question type was successfully destroyed.') }
      end
    end
  end
end
