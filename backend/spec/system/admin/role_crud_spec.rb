require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  describe 'CRUD' do
    before do
      sign_in create(:user)
      visit admin_roles_path
    end

    context 'when list' do
      it { expect(page).to have_content 'Role' }
    end

    context 'when destroy' do
      before do
        click_on 'Destroy'
        page.accept_alert
      end

      it { expect(page).to have_content "Can't destroy role with 1 users" }
    end

    context 'when create' do
      before do
        click_on 'New role'
        fill_in 'Role type', with: 'test role'
        click_button 'Create Role'
      end

      it { expect(page).to have_text('Role was successfully created.') }
    end

    context 'when edit' do
      before do
        role = create(:role_admin)
        visit edit_admin_role_path(role)
        click_button 'Update Role'
      end

      it { expect(page).to have_text('Role was successfully updated.') }
    end
  end
end
