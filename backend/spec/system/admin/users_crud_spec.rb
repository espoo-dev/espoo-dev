require 'rails_helper'

RSpec.describe 'Users CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }
    let(:user_student) { build(:user_student) }
    let!(:role_student) { create(:role_student) }

    it 'goes to log in page when user is not logged' do
      visit new_admin_user_path
      expect(page).to have_current_path(new_user_session_path)
    end

    describe '#create' do
      before do
        sign_in user_admin
        visit new_admin_user_path
        fill_in 'Email', with: user_student.email
        fill_in 'Password', with: user_student.password
        fill_in 'Phone', with: user_student.phone
        fill_in 'Role', with: user_student.role
        find('label', text: 'Role').click
        find('.option', text: role_student.role_type).click
        click_on 'Create User'
      end

      it { expect(page).to have_text('User was successfully created.') }
    end

    describe '#index' do
      context 'when user is a admin' do
        before do
          sign_in user_admin
          visit admin_users_path
        end

        it { expect(page).not_to have_text(user_admin.id) }

        it 'sees all users' do
          expect(page.text).to include(user_admin.email, user_teacher.email)
        end

        it 'sees all roles' do
          expect(page.text).to include(user_admin.role.role_type, user_teacher.role.role_type)
        end
      end

      context 'when user is a teacher' do
        before do
          sign_in user_teacher
          visit admin_users_path
        end

        it 'is at for admin/teachers page' do
          expect(page).to have_current_path(admin_users_path)
        end

        it 'sees himself' do
          expect(page.text).to include(user_teacher.email)
        end

        it 'does not see other user' do
          expect(page.text).not_to include(user_admin.email)
        end
      end
    end

    describe '#edit' do
      context 'when user is a admin' do
        before do
          sign_in user_admin
          visit edit_admin_user_path(user_admin)
        end

        it 'does see role' do
          expect(page.text).to include('Role')
        end
      end

      context 'when user is a teacher' do
        before do
          sign_in user_teacher
          visit edit_admin_user_path(user_teacher)
        end

        it 'does not see role' do
          expect(page.text).not_to include('Role')
        end
      end
    end

    describe '#update' do
      context 'when user is a admin' do
        before do
          sign_in user_admin
          visit edit_admin_user_path(user_teacher)
          fill_in 'Password', with: user_teacher.password
          fill_in 'Phone', with: 123_456_789
          find('label', text: 'Role').click
          find('.option', text: 'admin').click

          click_on 'Update User'
        end

        it { expect(page).to have_text('User was successfully updated.') }
      end
    end

    describe '#destroy' do
      before do
        sign_in user_admin
        visit admin_users_path
        first(:link, 'Destroy').click
        page.accept_alert
      end

      it { expect(page).to have_current_path(new_user_session_path) }
    end
  end
end
