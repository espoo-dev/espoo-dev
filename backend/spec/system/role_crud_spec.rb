require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    before do
      sign_in create(:user)
    end

    describe 'list' do
      it 'visits roles' do
        visit admin_roles_path

        expect(page).to have_content 'Role'
      end
    end

    describe 'destroy' do
      it 'cannot destroy role' do
        visit admin_roles_path

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_content "Can't destroy role with 1 users"
      end
    end
  end
end
