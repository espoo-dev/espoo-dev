require 'rails_helper'

RSpec.describe 'Admin CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let(:user) { create(:user) }
    let(:user2) { build(:user) }
    let!(:role) { create(:role_teacher) }

    it 'goes to log in page when user is not logged' do
      visit new_admin_user_path
      expect(page).to have_current_path(new_user_session_path)
    end

    describe '#create' do
      before do
        sign_in user
        visit new_admin_user_path
        fill_in 'Email', with: user2.email
        fill_in 'Password', with: user2.password
        fill_in 'Phone', with: user2.phone
        fill_in 'Role', with: user2.role
        find('label', text: 'Role').click
        find('.option', text: role.role_type).click
        click_on 'Create User'
      end

      it { expect(page).to have_text('User was successfully created.') }
    end

    describe '#destroy' do
      before do
        sign_in user
        visit admin_users_path

        click_on 'Destroy'
        page.accept_alert
      end

      it { expect(page).to have_current_path(new_user_session_path) }
    end

    describe '#update' do
      before do
        user3 = create(:user)

        sign_in user
        visit edit_admin_user_path(user3)

        fill_in 'Password', with: user3.password
        fill_in 'Phone', with: 123_456_789

        click_on 'Update User'
      end

      it { expect(page).to have_text('User was successfully updated.') }
    end

    describe '#index' do
      before do
        sign_in user
        visit admin_users_path
      end

      it { expect(page).to have_text(user.email) }
      it { expect(page).not_to have_text(user.id) }
    end
  end
end
