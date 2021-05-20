require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }

    describe 'when logged user is admin' do
      before do
        sign_in user_admin
      end

      describe 'index' do
        before do
          visit admin_users_path
        end

        it 'sees all users' do
          expect(page.text).to include(user_admin.email, user_teacher.email)
        end

        it 'sees all roles' do
          expect(page.text).to include(user_admin.role.role_type, user_teacher.role.role_type)
        end
      end

      describe 'edit' do
        before do
          visit edit_admin_user_path(user_admin)
        end

        it 'does see role' do
          expect(page.text).to include('Role')
        end
      end
    end

    describe 'when logged user is not admin' do
      before do
        sign_in user_teacher
      end

      describe 'index' do
        before do
          visit admin_users_path
        end

        it 'is at admin/users page' do
          expect(page).to have_current_path(admin_users_path)
        end

        it 'sees himself' do
          expect(page.text).to include(user_teacher.email)
        end

        it 'does not see other user' do
          expect(page.text).not_to include(user_admin.email)
        end
      end

      describe 'edit' do
        before do
          visit edit_admin_user_path(user_teacher)
        end

        it 'does not see role' do
          expect(page.text).not_to include('Role')
        end
      end
    end
  end
end
