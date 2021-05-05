require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user_admin) { create(:user) }
    let!(:user_teacher) { create(:user_teacher) }

    describe 'when logged user is admin' do
      before do
        sign_in user_admin
        visit '/admin/users'
      end

      it 'sees all users' do
        expect(page.text).to include(user_admin.email, user_teacher.email)
      end
    end

    describe 'when logged user is not admin' do
      before do
        sign_in user_teacher
        visit '/admin/users'
      end

      it 'is at admin/users page' do
        expect(page).to have_current_path('/admin/users')
      end

      it 'sees himself' do
        expect(page.text).to include(user_teacher.email)
      end

      it 'does not see other user' do
        expect(page.text).not_to include(user_admin.email)
      end
    end
  end
end
