require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    before do
      sign_in create(:user)
      visit admin_roles_path
    end

    describe 'list' do
      it { expect(page).to have_content 'Role' }
    end

    describe 'destroy' do
      before do
        click_on 'Destroy'
        page.accept_alert
      end

      it { expect(page).to have_content "Can't destroy role with 1 users" }
    end

    describe 'when create' do
      before do
        click_on 'New role'
        fill_in 'Role type', with: 'test role'
        click_button 'Create Role'
      end

      it { expect(page).to have_text('Role was successfully created.') }
    end
  end
end
