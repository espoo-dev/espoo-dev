require 'rails_helper'

RSpec.describe 'Admin CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let(:user) { create(:user) }
    let(:user2) { build(:user) }

    it 'creates user' do
      sign_in user
      visit '/admin/users/new'

      fill_in 'Email', with: user2.email
      fill_in 'Password', with: user2.password
      fill_in 'Phone', with: user2.phone
      fill_in 'Role', with: user2.role

      click_on 'Create User'

      expect(page).to have_text('User was successfully created.')
    end

    it 'Delete user' do
      sign_in user
      visit '/admin/users'

      click_on 'Destroy'
      page.accept_alert

      expect(page).to have_current_path('/users/sign_in')
    end

    it 'edit user' do
      user3 = create(:user)

      sign_in user
      visit "/admin/users/#{user3.id}/edit"

      fill_in 'Password', with: user3.password
      fill_in 'Phone', with: 123_456_789

      click_on 'Update User'

      expect(page).to have_text('User was successfully updated.')
    end
  end
end
