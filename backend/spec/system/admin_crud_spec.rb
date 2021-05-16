require 'rails_helper'

RSpec.describe 'Admin CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let(:user) { create(:user) }
    let(:user2) { build(:user) }
    let!(:role) { create(:role_teacher) }

    it 'goes to log in page when user is not logged' do
      visit '/admin/users/new'
      expect(page).to have_current_path('/users/sign_in')
    end

    it 'creates user' do
      sign_in user
      visit '/admin/users/new'

      fill_in 'Email', with: user2.email
      fill_in 'Password', with: user2.password
      fill_in 'Phone', with: user2.phone
      fill_in 'Role', with: user2.role
      find('label', text: 'Role').click
      find('.option', text: role.role_type).click
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

    it 'list users without id' do
      sign_in user

      visit '/admin/users'

      expect(page).to have_text(user.email)
      expect(page).not_to have_text(user.id)
    end
  end
end
